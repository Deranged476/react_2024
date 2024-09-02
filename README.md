# Käyttäjäjienhallinta järjestelmä

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

| Tavoite                                       | HTTP-pyyntö | URL                  | Palaute                                                                      |
| :-------------------------------------------- | :---------: | :------------------- | :--------------------------------------------------------------------------- |
| Palauttaa kaikki käyttäjät                    |     GET     | /api/users/          | {users:[{**nimi**,**bio**},{**nimi**,**bio**},...],message:"",error:boolean} |
| Palauttaa käyttäjän käyttäjänimen perusteella |     GET     | /api/users/:username | {user:{**nimi**,**bio**},message:"",error:boolean}                           |
| Rekisteröi uuden käyttäjän                    |    POST     | /api/users/          | {user:{**nimi**,**bio**},message:"",error:boolean}                           |
| Kirjaa käyttäjän sisään                       |    POST     | /api/users/login     | {message:"",error:boolean,token:""}                                          |
| Päivittää käyttää käyttäjänimen perusteella   |     PUT     | /api/users/:username | {user:{**nimi**,**bio**},message:"",error:boolean}                           |
| Poistaa käyttäjän käyttäjänimen perusteella   |   DELETE    | /api/users/:username | {message:"",error:boolean}                                                   |

## Frontend

### Tiedostot

    frontend/
        node_modules/               // Noden moduulit ovat tässä kansiossa
            ...
        public/                     // Julkiset tiedostot
            index.html              // Perus HTML-tiedosto
            mainifest.json          // Web-sovelluksen manifest-tiedosto
        src/                        // Kaikki React lähdekoodi
            components/             // REact komponentit
                Login.js            // Login komponentti
                Palvelut.js         // Plavelut komponentti
                PrivateRoute.js     // PrivateRoute komponentti
                Register.js         // Register komponentti
                UserManagement.js   // Käyttäjänhallinta komponentti
            App.js                  // Sovelluksen pääkomponentti
            App.css                 // Päätyylitiedosto
            index.js                // Index-tiedoston tyylitiedosto
            index.css               // Reactin juuritiedosto
        .env                        // Konfigurointi tiedosto
        package-lock.json           // Noden moduulien tiedot
        package.json                // Noden riippuvuus tiedot
    .gitignore                      // 
    package-lock.json               // Noden moduulien tiedot
    package.json                    // Noden riippuvuus tiedot
    README.md                       // Projectin yleinen kuvaus ja ohjeet

### App
    
 
### Komponentit
    

#### Login 
    

#### Register
    

#### UserManagement
    
#### Palvelut
    Käyttäjä pääsee vain /palvelut sivulle jos on kirjtunut sisään olemassa olevalla tunnuksella 

#### PrivateRoute
    
    



        
            
        
