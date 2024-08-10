import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import dkim from "dkim";
import nodemailer from 'nodemailer'
import axios from "axios";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dotenv.config();

export const usePasswordHashToMakeToken = ({
  password: passwordHash,
  id: userId,
  createdAt,
}) => {
  const secret = `${passwordHash - createdAt}`;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600, // 1 hour
  });
  return token;
};

export const transporter = async (msg, res) => {
  try {
    await sgMail.send(msg);
    //   return res.status(200).json({ message: 'Mail sent successfully' });
  } catch (err) {
    return res.status(500).json({ "Error sending email": err });
  }
};

export const getPasswordResetURL = (user, token) =>
  `${process.env.RESET_PASSWORD_URL}${user.id}/${token}`;

export const resetPasswordTemplate = (user, url) => {
  const from = "bright@communsphere.com";
  const to = user.email;
  const subject = "Communsphere Password Reset";
  const html = `
    <p>Hey ${user.first_name || user.email},</p>
    <p>We heard that you lost your Communsphere password. Sorry about that!</p>
    <p>But don’t worry! You can use the following link to reset your password:</p>
    <a href=${url}>${url}</a>
    <p>If you don’t use this link within 1 hour, it will expire.</p>
    <p>–Your friends at Communsphere</p>
    `;
  return {
    from,
    to,
    subject,
    html,
  };
};

export const welcomeEmailTemplate = (user) => {
  const from = "bright@communsphere.com";
  const to = user.email;
  const subject = "Welcome to Communsphere!";
  const html = `
    <p>Welcome to COmmunsphere</p>
    <p>Welcome ${user.first_name || user.email},</p>
    <p>Thanks for signing up!</p>
    <p>If you’ve been trying to streamline customer conversations scattered across numerous apps, we bet you’ll find Simpu a fresh, calm, and orderly alternative to the chaos you’re probably used to. It doesn’t have to be nuts!</p>
    <p>–Your friends at Communsphere</p>
    `;
  return {
    from,
    to,
    subject,
    html,
  };
};

export const generateDKIMRecords = async (domainName) => {
  try {
    const response = await fetch(
      `${process.env.PLAYWRIGHT_PROJECT_URL}get_domain_dkim/${domainName}`
    );
    console.log(response, "response");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const DKIMRecordsLookup = async (domainName) => {
  try {
    const response = await fetch(
      `${process.env.PLAYWRIGHT_PROJECT_URL}domain_dkim_lookup/${domainName}`
    );
    console.log(response, "response");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const DKIMRecordsGenerate = async (domainName) => {
  try {
    const payload = {
      "domain":domainName,"selector":"S1","key_length":"2048"
    }
    const response = await axios.post(`${process.env.DKIM_GENERATOR_URL}dkim-generator`, payload)
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const dkimLookup = async (domainName) => {
  try {
    const payload = {
      "domain":domainName,"selector":"S1"
    }
    const response = await axios.post(`${process.env.DKIM_GENERATOR_URL}dkim-record`, payload)
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const replaceVariable = (emailTemplate, variables) => {
  // Regular expression to match placeholders like {VARIABLE}
  const variableRegex = /{([A-Z]+)}/g;

  // Replace placeholders in email template
  const replacedTemplate = emailTemplate.replace(
    variableRegex,
    (match, variable) => {
      // Check if the variable exists in variables object
      if (variables.hasOwnProperty(variable)) {
        return variables[variable];
      } else {
        // Placeholder not found, return the original match
        return match;
      }
    }
  );
  return replacedTemplate
};

export const nodemailerTransport = (data) => {
  const cleanedKey = data.private_key
  .replace(/-----BEGIN RSA PRIVATE KEY-----/, '')
  .replace(/-----END RSA PRIVATE KEY-----\n/, '')
  .replace(/\n/g, '');
  const transporter = nodemailer.createTransport({
    host: `smtp.${data.domain}`,
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    dkim: {
      domainName: data.domain,
      keySelector: "S1",
      privateKey: `-----BEGIN PRIVATE KEY----- ${cleanedKey}`
    }
  });
  return transporter
}
