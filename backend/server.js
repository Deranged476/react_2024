// Tässä tiedostossa määritetetään express ja sen polut
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// .env tiedoston käyttöönotto
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api/users", usersRoutes);

app.listen(port, () => {
  console.log(`user-management-app listening on port ${port}/api/users/`);
});
