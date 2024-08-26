// Tässä tiedostossa määritetetään express ja sen polut

import express from "express";

// .env tiedoston käyttöönotto
import dotenv from "dotenv";
dotenv.config();

// 
import { usersRoutes } from "./routes/api.js";

const app = express();

const port = process.env.PORT || 3333;

app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/text")
  res.send("Käyttäjien hallinta backend");
});

app.listen(port, () => {
  console.log(`user-management-app listening on port ${port}`);
});
