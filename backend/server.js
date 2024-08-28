// Tässä tiedostossa määritetetään express ja sen polut
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// .env tiedoston käyttöönotto
import dotenv from "dotenv";
dotenv.config();
// try {
//   mongoose.connect(process.env.MONGODB_URI);
//   console.log("MongoDB yhdistetty");
// } catch(exception) {
//   console.log("MongoDB:n yhdistys epäonnistui");
// }


import { usersRoutes } from "./routes/api.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }))
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/text")
  res.send("Käyttäjien hallinta backend");
});

app.listen(port, () => {
  console.log(`user-management-app listening on port ${port}`);
  console.log(`http://localhost:${port}/api/users`);
});
