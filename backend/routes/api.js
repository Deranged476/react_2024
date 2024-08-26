// Tiedoston tarkoitus on määrittää express routereihin HTTP-pyynnöille omat käsittely funktiot
import express from "express";
import {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";

export var usersRoutes = express.Router();
// Palauttaa kaikki käyttäjät
usersRoutes.get("/", getUsers);
// Palauttaa käyttäjän käyttäjänimen perusteella
usersRoutes.get("/:username", getUser);
// Rekisteröi uuden käyttäjän
usersRoutes.post("/", registerUser);
// Päivittää olemassa olevaa käyttäjää
usersRoutes.put("/:username", updateUser);
// Poistaa olemassa olevan käyttäjän
usersRoutes.delete("/:username", deleteUser);
