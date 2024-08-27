## Backend

### Tiedostot

    backend/
        node_modules/           // Noden moduulit ovat tässä kansiossa
            ...
        controllers/            // HTTP-pyyntöjen käsittely
            users.js            // Käyttäjään kohdistuvat HTTP-pyyntöjä käsittelevät funktiot
        models/                 // Mongoosen mallit
            User.js             // Käyttäjä dokumentin malli
        routes/                 // Expressin routerit.
            api.js              // Sovelluksen toimintalogiikkaan liittyvät HTTP-pyynnöt
        server.js               // Sovelluksen lähtöpiste
        .env                    // Konfigurointi tiedosto
        package-lock.json       // Noden moduulien tiedot
        package.json            // Noden riippuvuus tiedot
        README.md               // Dokumentaatio bäckendistä

### Tietokanta

Tietokanta on mongodb. Alla tietokannan kaavio:

    user-management-app         // Tietokannan nimi
        users                   // Kokoelman nimi
            _id
            username
            password
            bio

### HTTP pyynnöt

| Tavoite                                       | HTTP-pyyntö | URL                  | Palaute                                     |
| :-------------------------------------------- | :---------: | :------------------- | :------------------------------------------ |
| Palauttaa kaikki käyttäjät                    |     GET     | /api/users/          | {**nimi**,**bio**}                          |
| Palauttaa käyttäjän käyttäjänimen perusteella |     GET     | /api/users/:username | [{**nimi**,**bio**},{**nimi**,**bio**},...] |
| Rekisteröi uuden käyttäjän                    |    POST     | /api/users/          | OK                                          |
| Päivittää käyttää käyttäjänimen perusteella   |     PUT     | /api/users/:username | OK                                          |
| Poistaa käyttäjän käyttäjänimen perusteella   |   DELETE    | /api/users/:username | OK                                          |
