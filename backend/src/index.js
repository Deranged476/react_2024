// Tässä tiedostossa määritetetään express ja sen polut

import express from "express";

// .env tiedoston käyttöönotto
import dotenv from "dotenv";
dotenv.config();

// 
import { usersRoutes } from "./routes/api.js";

const app = express();

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`user-manage-app listening on port ${port}`);
});
