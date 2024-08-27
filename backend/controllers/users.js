// Tiedosto sisältää käyttäjiin liittyvien HTTP-pyyntöjen käsittelyyn käytettäviä funktioita

import { UserModel } from "../models/User.js";
import { usersRoutes } from "../routes/api.js";

// Palauttaa kaikki käyttäjät json muodosssa
export function getUsers(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  // UserModel.find({})
  //   .select("username -_id")
  //   .then((err, data) => {
  //     res.end(JSON.stringify(data));
  //   });
  res.end(JSON.stringify([{ nimi: "Jouni React", bio: "Olen ohjelmistokehittäjä" },{ nimi: "Jouni React", bio: "Olen ohjelmistokehittäjä" }], null, 3))
}
// Palauttaa käyttäjän json muodosssa käyttäjänimen perusteella
export function getUser(req, res, next) {
  if(!req.params.username.length) {
    res.status(400).send("Bad request");
  }
  res.setHeader("Content-Type", "application/json");
  // UserModel.findOne({username:req.params.username}).select("username bio -_id").then(user=>{
  //   if(user) res.send(JSON.stringify(user));
  //   else res.status(400).send("Bad request");
  // }).catch(err=>{
  //   if(err) {
  //       res.status(400).send("Bad request");
  //   }
  // });
  res.end(JSON.stringify({ nimi: "Jouni React", bio: "Olen ohjelmistokehittäjä" }, null, 3))
}
// Rekisteröi uuden käyttäjän
export function registerUser(req, res, next) {
  // UserModel.create({ username: "Jouni2", password: "Salasana", bio: "bio" })
  //   .then(() => {
  //     res.status(201).send("OK");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(403).send("Forbidden");
  //   });
  res.status(201).send("OK");
}
// Kirjaa käyttäjän sisään.
export function loginUser(req, res, next) {
  next();
}
// Päivittää käyttäjää käyttäjänimen, uusien tietojen perusteella
export function updateUser(req, res, next) {
  if(!req.params.username.length) {
    res.status(400).send("Bad request");
  }
  // UserModel.updateOne({username:req.params.username},{username:req.body.username,password:req.body.password,bio:req.body.bio}).then(result=>{console.log(result),res.status(200).send("OK")}).catch(err=>{if(err) {console.log(err),res.status(404).send("Not Found")}});
  
  res.status(201).send("OK");

}
// Poistaa käyttäjän käyttäjänimen perusteella

export function deleteUser(req, res, next) {
  if(!req.params.username.length) {
    res.status(400).send("Bad request");
  }
  // UserModel.deleteOne({username:req.params.username}).then(result=>{console.log(result),res.status(200).send("OK")}).catch(err=>{if(err) {console.log(err),res.status(400).send("Bad request")}});
  res.status(201).send("OK");
}
