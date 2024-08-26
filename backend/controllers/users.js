// Tiedosto sisältää käyttäjiin liittyvien HTTP-pyyntöjen käsittelyyn käytettäviä funktioita

// Palauttaa kaikki käyttäjät json muodosssa
export function getUsers(req,res,next) {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify([{ nimi: "Jouni React", bio: "Olen ohjelmistokehittäjä" },{ nimi: "Jouni React", bio: "Olen ohjelmistokehittäjä" }], null, 3))
}
// Palauttaa käyttäjän json muodosssa käyttäjänimen perusteella
export function getUser(req,res,next) {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ nimi: "Jouni React", bio: "Olen ohjelmistokehittäjä" }, null, 3))
}
// Rekisteröi uuden käyttäjän
export function registerUser(req,res,next) {
    res.status(201).send("OK")
}
// Kirjaa käyttäjän sisään.
export function loginUser(req,res,next) {
    next();
}
// Päivittää käyttäjää käyttäjänimen, uusien tietojen perusteella
export function updateUser(req,res,next) {
    res.status(201).send("OK")
}
// Poistaa käyttäjän käyttäjänimen perusteella
export function deleteUser(req,res,next) {
    res.status(201).send("OK")
}