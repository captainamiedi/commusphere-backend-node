import dotenv from 'dotenv';

dotenv.config();
import express from 'express'
import cors from 'cors'
const app = express();
import Route from "./routes/index.js";

const prefix = '/api/v1'
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

Route(prefix, app)
// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
   res.send("Hello, scan to pay");
});

app.listen(PORT, () => {
   console.log(`Server is up at ${PORT}`);
});