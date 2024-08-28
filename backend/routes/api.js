// Tiedoston tarkoitus on määrittää express routereihin HTTP-pyynnöille omat käsittely funktiot
import express from "express";
import {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  logUserIn,
  isLoggedIn
} from "../controllers/Users.js";

export var usersRoutes = express.Router();
// Palauttaa kaikki käyttäjät
usersRoutes.get("/", getUsers);
// Palauttaa käyttäjän käyttäjänimen perusteella
usersRoutes.get("/:username", isLoggedIn, getUser);
// Rekisteröi uuden käyttäjän
usersRoutes.post("/", registerUser);
// Kirjaa käyttäjän sisään
usersRoutes.post("/login", logUserIn);
// Päivittää olemassa olevaa käyttäjää
usersRoutes.put("/:username", updateUser);
// Poistaa olemassa olevan käyttäjän
usersRoutes.delete("/:username", deleteUser);
