## Backend

### Tiedostot

    backend/
        node_modules/           // Noden moduulit ovat tässä kansiossa
            ...
        src/                    // Lähdekoodit
            controllers/        // HTTP-pyyntöjen käsittely
                Users.js        // Käyttäjään kohdistuvat HTTP-pyyntöjä käsittelevät funktiot
            models/             // Mongoosen dokumentin modelit
                User.js         // Mongodb käyttäjä dokumentin malli
            routes/             // Expressin routerit.
                api.js          // Sovelluksen toimintalogiikkaan liittyvät HTTP-pyynnöt
            index.js            // Sovelluksen lähtöpiste
        .env                    // Konfigurointi tiedosto
        package-lock.json       // Noden moduulien tiedot
        package.json            // Noden riippuvuus tiedot
        README.md               // Dokumentaatio

### Tietokanta

Tietokanta on mongodb. Alla tietokannan kaavio:

    user-management-app         // Tietokannan nimi
        users                   // Kokoelman nimi
            _id
            username
            password
            bio

### HTTP pyynnöt

| Tavoite                                       | HTTP-pyyntö | URL              | Palaute                                     |
| :-------------------------------------------- | :---------: | :--------------- | :------------------------------------------ |
| Palauttaa kaikki käyttäjät                    |     GET     | /users/          | {**nimi**,**bio**}                          |
| Palauttaa käyttäjän käyttäjänimen perusteella |     GET     | /users/:username | [{**nimi**,**bio**},{**nimi**,**bio**},...] |
| Rekisteröi uuden käyttäjän                    |    POST     | /users/          | OK                                          |
| Päivittää käyttää käyttäjänimen perusteella   |     PUT     | /users/:username | OK                                          |
| Poistaa käyttäjän käyttäjänimen perusteella   |   DELETE    | /users/:username | OK                                          |
