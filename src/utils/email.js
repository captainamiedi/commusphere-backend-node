import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import dkim from 'dkim'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dotenv.config();

export const usePasswordHashToMakeToken = ({
    password: passwordHash,
    id: userId,
    createdAt
  }) => {
    const secret = `${passwordHash - createdAt}`;
    const token = jwt.sign({ userId }, secret, {
      expiresIn: 3600 // 1 hour
    });
    return token;
};

export const transporter = async (msg, res) => {
    try {
      await sgMail.send(msg);
    //   return res.status(200).json({ message: 'Mail sent successfully' });
    } catch (err) {
      return res.status(500).json({ 'Error sending email': err });
    }
};

export const getPasswordResetURL = (user, token) => `${process.env.RESET_PASSWORD_URL}${user.id}/${token}`;

export const resetPasswordTemplate = (user, url) => {
    const from = 'bright@communsphere.com';
    const to = user.email;
    const subject = 'Communsphere Password Reset';
    const html = `
    <p>Hey ${user.first_name || user.email},</p>
    <p>We heard that you lost your Communsphere password. Sorry about that!</p>
    <p>But don’t worry! You can use the following link to reset your password:</p>
    <a href=${url}>${url}</a>
    <p>If you don’t use this link within 1 hour, it will expire.</p>
    <p>–Your friends at Communsphere</p>
    `;
    return {
      from, to, subject, html
    };
};

export const welcomeEmailTemplate = (user) => {
    const from = 'bright@communsphere.com';
    const to = user.email;
    const subject = 'Welcome to Communsphere!';
    const html = `
    <p>Welcome to COmmunsphere</p>
    <p>Welcome ${user.first_name || user.email},</p>
    <p>Thanks for signing up!</p>
    <p>If you’ve been trying to streamline customer conversations scattered across numerous apps, we bet you’ll find Simpu a fresh, calm, and orderly alternative to the chaos you’re probably used to. It doesn’t have to be nuts!</p>
    <p>–Your friends at Communsphere</p>
    `;
    return {
      from, to, subject, html
    };
}

export const generateDKIMRecords = (domainName) => {
  try {
    const response = dkim.getKey(domainName, function( error, key ) {
      console.log(error, 'error');
      console.log(key, 'keys');
    })
//     // Generate DKIM keys
//   dkim.generateKeys(domainName, (err, keypair) => {
//   if (err) {
//     console.error('Error generating DKIM keys:', err);
//     return;
//   }

//   console.log('Public key (DNS TXT record):');
//   console.log(dkim.getDkimRecord(keypair));

//   console.log('\nPrivate key:');
//   console.log(keypair.private);
// });
    console.log(response, 'response');
  } catch (error) {
    throw error
  }
}