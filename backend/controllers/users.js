// Tiedosto sisältää käyttäjiin liittyvien HTTP-pyyntöjen käsittelyyn käytettäviä funktioita

import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Palauttaa ja päivittää nykyisen käyttäjän tiedot json muodossa
export function getCurrentUser(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  UserModel.findOne({ username: req.user })
    .select("username bio") 
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          user: null,
          message: "Käyttäjää ei löytynyt",
          error: true,
        });
      }

      const updateData = {};
      if (req.body.username) updateData.username = req.body.username;
      if (req.body.password) updateData.password = req.body.password;
      if (req.body.bio) updateData.bio = req.body.bio;

      if (Object.keys(updateData).length === 0) {
        return res.status(200).json({
          user: {
            username: user.username,
            bio: user.bio,
          },
          message: "Käyttäjän tiedot haettiin onnistuneesti, päivitystä ei tarvittu",
          error: false,
        });
      }

      // Päivitä käyttäjän tiedot, jos req.body sisältää päivityksiä
      UserModel.updateOne({ username: req.user }, updateData)
        .then((updateResult) => {
          if (updateResult.nModified > 0) {
            return res.status(200).json({
              user: {
                username: updateData.username || user.username,
                bio: updateData.bio || user.bio,
              },
              message: "Käyttäjän tiedot päivitettiin onnistuneesti",
              error: false,
            });
          } else {
            return res.status(200).json({
              user: {
                username: user.username,
                bio: user.bio,
              },
              message: "Käyttäjän tiedot haettiin onnistuneesti, mutta päivitystä ei tarvittu",
              error: false,
            });
          }
        })
        .catch((err) => {
          console.error("Error updating user:", err);
          return res.status(500).json({
            user: null,
            message: "Palvelin virhe käyttäjän päivityksessä",
            error: true,
          });
        });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      return res.status(500).json({
        user: null,
        message: "Palvelin virhe",
        error: true,
      });
    });
}

// Palauttaa kirjautuuneen käyttäjän nimen json muodossa
export function getLoggedInUsername(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({username:req.username});
}

// Palauttaa kaikki käyttäjät json muodosssa
export function getUsers(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  UserModel.find({})
    .select("username bio -_id")
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
    .select("username bio -_id password")
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
export async function registerUser(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  if (!req.body.username) {
    res
      .status(400)
      .json({ user: {}, message: "username is not defined" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash((req.body.password) ? (req.body.password) : (""), salt);

  UserModel.create({
    username: req.body.username,
    password: hashedPassword,
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
        error: true,
      });
    });
}

// Kirjaa käyttäjän sisään.
export async function logUserIn(req, res, next) {
  const { username, password } = req.body;

  var user = await UserModel.findOne({ username: username });

  if (user) {
    // Check if username and password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Generate JWT token
      const options = {
        expiresIn: "1h", // Token expiration time
      };

      const token = jwt.sign(
        { name: username },
        process.env.JWT_SECRET_KEY,
        options
      );

      res.json({
        success: true,
        message: "kirjautuminen onnistui!",
        token: token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Väärä käyttäjänimi tai salasana",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Väärä käyttäjänimi tai salasana",
    });
  }
}

export async function isLoggedIn(req, res, next) {
  const { authorization } = req.headers;

  var token;
  // Removing 'Bearer ' prefix to get the token
  try {
    token = authorization.replace("Bearer ", "");
  } catch(err) {
    res.setHeader("Content-Type", "application/json");
      return res.status(403).json({
        message: "Tokenia ei ollut",
        error: true,
      });
  }
  

  //Verifying if the token is valid.
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      res.setHeader("Content-Type", "application/json");
      return res.status(403).json({ 
        message: "Tokeni ei kelpaa", 
        error: true 
      });
    }

    // Adding user name to the request object
    req.username = payload.name;
    console.log(payload);
    
    // Checking if user exists
    var user = await UserModel.findOne({ username: payload.name });
    if (!user) {
      res.setHeader("Content-Type", "application/json");
      return res.status(403).json({
        message: "Tokeniin kohdistuvaa käyttäjää ei löytynyt",
        error: true,
      });
    }
    next();
  });
}

// Päivittää käyttäjää käyttäjänimen, uusien tietojen perusteella
export function updateUser(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  if (!req.body.username && !req.body.password && !req.body.bio) {
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
