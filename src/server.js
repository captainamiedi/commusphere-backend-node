import dotenv from 'dotenv';

dotenv.config();
import express from 'express'
import cors from 'cors'
const app = express();
import Route from "./routes/index.js";
import { errorHandler } from '@dimosbotsaris/express-error-handler';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import { createServer } from "http";
import { Server } from "socket.io";
import socketService from './Service/socketService.js';


const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "*",
    methods: ['GET', 'POST', 'PUT'],
  },
});

global._io = io
const prefix = '/api/v1'
app.use(cors());

// Increase the limit for JSON payloads
app.use(express.json({ limit: '100mb' }));

// parse requests of content-type - application/json
// app.use(express.json());

app.use(errorHandler({}));

// parse requests of content-type - application/x-www-form-urlencoded
// Increase the limit for URL-encoded payloads
app.use(express.urlencoded({ limit: '100mb', extended: true }));

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
 socketService(io)
httpServer.listen(PORT, () => {
   console.log(`Server is up at ${PORT}`);
});

// sequelize model:create --name MyUser --attributes first_name:string,last_name:string,bio:text
// $ npx sequelize-cli migration:generate --name add-new-column-to-socialMedia