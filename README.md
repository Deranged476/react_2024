# Käyttäjäjienhallinta järjestelmä

## Sovelluksen siirto al 2023 instanssille

1. Lisää aws:än security group uusi inbound rule, joka sallii portin 5000 tcp-protokollalla 
2. Tiedostojen siirto palvelimelle (githubin main-branch)

        /var/www/react_2024
3. .env tiedoston luonti backend kansioon

    PORT=5000
    MONGODB_URI=mongodb+srv://<käyttäjä>:<salasana>@cluster0.ff9bnq3.mongodb.net/hallinta?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET_KEY=<salainenavain>

4. Asenna noden moduulit

        cd /var/www/react_2024/backend
        npm install
        cd ../frontend
        npm install    

5. Tee react build

        cd /var/www/react_2024/frontend
        npm run build

6. Käynnistys (valinnainen)

        cd /var/www/react_2024/backend
        npm start

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
            components/             // React komponentit
                Login.js            // Login komponentti
                Palvelut.js         // Palvelut komponentti
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
 Sovelluksen pääkomponentti
 
### Komponentit
    

#### Login 
 Kirjautumis komponetti

#### Register
 Rekisteröinti komponentti

#### UserManagement
 käyttäjien hallinta
    
#### Palvelut
 Käyttäjä pääsee vain /palvelut sivulle jos on kirjtunut sisään olemassa olevalla tunnuksella.
 /palvelut sivulla sijaitsee käyttäj toiminnot

#### PrivateRoute
    


        
            
        
