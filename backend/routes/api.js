// Tiedoston tarkoitus on määrittää express routereihin HTTP-pyynnöille omat käsittely funktiot
import express from "express";
import {
  getUsers,
  getUser,
  getCurrentUser,
  //authenticateToken,
  registerUser,
  updateUser,
  deleteUser,
  logUserIn,
  isLoggedIn,
  getLoggedInUsername
} from "../controllers/users.js";

export var usersRoutes = express.Router();

// Palauttaa kaikki käyttäjät
usersRoutes.get("/", getUsers);

// Palauttaa kirjautuneen käyttäjän tiedot
usersRoutes.get("/current", isLoggedIn, getCurrentUser);

// Palauttaa käyttäjän käyttäjänimen perusteella
usersRoutes.get("/:username", isLoggedIn, getUser);

// Rekisteröi uuden käyttäjän
usersRoutes.post("/", registerUser);

// Kirjaa käyttäjän sisään
usersRoutes.post("/login", logUserIn);

// Tarkistaa onko käyttäjä kirjautunut sisään
usersRoutes.post("/isLoggedIn", isLoggedIn,(req,res) => {res.setHeader("Content-Type", "application/json");res.status(200).json({message:"Käyttäjä on kirjatunut",username:req.user,success:true})});

// Päivittää olemassa olevaa käyttäjää
usersRoutes.put("/:username", isLoggedIn, updateUser);

// Poistaa olemassa olevan käyttäjän
usersRoutes.delete("/:username", isLoggedIn, deleteUser);
