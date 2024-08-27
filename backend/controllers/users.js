// Tiedosto sisältää käyttäjiin liittyvien HTTP-pyyntöjen käsittelyyn käytettäviä funktioita

import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";

// Palauttaa kaikki käyttäjät json muodosssa
export function getUsers(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  UserModel.find({})
    .select("username -_id")
    .then((data) => {
      res.status(200).json({
        users: data,
        message: data.length + " käyttäjää löytyi",
        error: false,
      });
    })
    .catch((err) => {
      res
        .status(403)
        .json({ users: [], message: "Palvelin virhe", error: true });
    });
}
// Palauttaa käyttäjän json muodosssa käyttäjänimen perusteella
export function getUser(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  UserModel.findOne({ username: req.params.username })
    .select("username bio -_id")
    .then((user) => {
      if (user)
        res
          .status(200)
          .json({ user: user, message: "Käyttäjä löytyi", error: false });
      else
        res
          .status(404)
          .json({ user: user, message: "Käyttäjää ei löytynyt", error: true });
    })
    .catch((err) => {
      if (err) {
        res
          .status(403)
          .json({ user: null, message: "Palvelin virhe", error: true });
      }
    });
}
// Rekisteröi uuden käyttäjän
export function registerUser(req, res, next) {
  console.log(req.body);
  res.setHeader("Content-Type", "application/json");
  if (!req.body.username || !req.body.password || !req.body.bio) {
    res
      .status(400)
      .json({ user: {}, message: "username, password or bio is not defined" });
  }
  UserModel.create({
    username: req.body.username,
    password: req.body.password,
    bio: req.body.bio,
  })
    .then(() => {
      res.status(201).json({
        user: {
          username: req.body.username,
          password: req.body.password,
          bio: req.body.bio,
        },
        message: "Käyttäjän rekisteröinti onnistui",
        error: false,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({ 
        message: "Käyttäjän rekisteröinti epäonnistui", 
        error: true 
      });
    });
}
// Kirjaa käyttäjän sisään.
export function logUserIn(req, res, next) {
  const { username, password } = req.body;


  // Check if username and password match
  if (username === user.username && password === user.password) {
    // Generate JWT token
    const secretKey = 'yourSecretKey'; // Replace with your own secret key
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);

    res.json({
      success: true,
      message: 'Authentication successful!',
      token: token,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password',
    });
  }
}
// Päivittää käyttäjää käyttäjänimen, uusien tietojen perusteella
export function updateUser(req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.bio) {
    res.status(400).json({
      user: {},
      message: "username, password or bio is not defined",
      error: true,
    });
  }
  UserModel.updateOne(
    { username: req.params.username },
    {
      username: req.body.username,
      password: req.body.password,
      bio: req.body.bio,
    }
  )
    .then((response) => {
      res.status(200).json({
        user: {
          username: req.body.username,
          password: req.body.password,
          bio: req.body.bio,
        },
        message: "Käyttäjä päivitettiin",
        error: false,
      });
    })
    .catch((err) => {
      if (err) {
        res.status(404).json({
          user: {},
          message: "Käyttäjää ei löytynyt",
          error: true,
        });
      }
    });
}
// Poistaa käyttäjän käyttäjänimen perusteella

export function deleteUser(req, res, next) {
  UserModel.deleteOne({ username: req.params.username })
    .then((result) => {
      res.status(200).json({ message: "Käyttäjä poistettiin", error: false });
    })
    .catch((err) => {
      if (err) {
        console.log(err),
          res
            .status(404)
            .json({ message: "Käyttäjää ei löytynyt", error: true });
      }
    });
}
