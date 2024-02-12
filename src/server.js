import dotenv from 'dotenv';

dotenv.config();
import express from 'express'
import cors from 'cors'
const app = express();
import Route from "./routes/index.js";
import { errorHandler } from '@dimosbotsaris/express-error-handler';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

const prefix = '/api/v1'
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

app.use(errorHandler({}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

Route(prefix, app)
// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
   res.send("Hello, scan to pay");
});

const options = {
   definition: {
     openapi: "3.1.0",
     info: {
       title: "Communsphere",
       version: "0.1.0",
       description:
         "Communsphere documentation made with Express and documented with Swagger",
       license: {
         name: "MIT",
         url: "https://spdx.org/licenses/MIT.html",
       },
       contact: {
         name: "Communsphere",
         url: "https://logrocket.com",
         email: "info@email.com",
       },
     },
     servers: [
       {
         url: "http://localhost:8080",
       },
     ],
   },
   apis: ["src/routes/*.js"],
 };
 const spec = swaggerJSDoc(options)
 app.use(
   "/api-docs",
   swaggerUi.serve,
   swaggerUi.setup(spec, {
      explorer: true,
      // customCssUrl:
      //   "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
   })
 );

app.listen(PORT, () => {
   console.log(`Server is up at ${PORT}`);
});

// sequelize model:create --name MyUser --attributes first_name:string,last_name:string,bio:text
