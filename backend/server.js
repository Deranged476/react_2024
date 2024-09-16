// Tässä tiedostossa määritetetään express ja sen polut
import mongoose from "mongoose";
import express from "express";
// Jos et käytä tätä proxy palvelimena niin ota https ja fs käyttöön
// import https from "https";
// import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
// .env tiedoston käyttöönotto
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

import { usersRoutes } from "./routes/api.js";

const app = express();

const port = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api/users", usersRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../frontend/build/index.html'));
});

// Jos et käytä tätä proxy palvelimena niin alla olevat koodit käyttöön
//const options = {
//  key: fs.readFileSync(path.join(__dirname,"apache-selfsigned.key")),
//   cert: fs.readFileSync(path.join(__dirname,"apache-selfsigned.crt"))
// };

// const server = https.createServer(options,app);

// server.listen(port, () => {
//   console.log(`user-management-app listening on port ${port}/api/users/`);
// });

app.listen(port, '0.0.0.0',() => {
  console.log(`user-management-app listening on port ${port}/api/users/`);
});

