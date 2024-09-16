import React, { /*useState, useEffect*/ } from "react";
import { useNavigate } from "react-router-dom";
//import querystring from 'querystring';
//import axios from "axios";
import '../App.css'

function Palvelut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth1');  // Poistetaan auth-token localStoragesta
        console.log('Käyttäjä on kirjautunut ulos');
        navigate('/kirjautuminen');  // Ohjataan käyttäjä takaisin kirjautumissivulle
    };

    const manageProfile = () => {
        // Lisätään haluttu toiminnallisuus profiilin hallintaan
        console.log('Profiilin hallinta avattu');
        navigate('/muokkaus');
    };

    const performAction = () => {
        // Lisätään haluttu toiminnallisuus toiminnon suorittamiseen
        console.log('Käyttäjien hallinta avattu');
        navigate('/kayttajat')
    };

    return (
        <div>
            <h1>Palvelusivu</h1>
            <p>Tervetuloa palvelusivulle!</p>

            <div className="user-info">
                <h2>Käyttäjän tiedot</h2>
                <p>Täällä voit tarkastella ja hallita tietojasi.</p>
                
                <p>Oman profiilin muokkaus</p>
                <button onClick={manageProfile}>Hallitse profiilia</button>

                <p>Käyttäjienhallinta</p>
                <button onClick={performAction}>Hallinta sivulle</button>
            </div>

            <div className="logout">
                <p>Kirjaudu ulos</p>
                <button onClick={handleLogout}>Kirjaudu ulos</button>
            </div>
        </div>
    );
}

export default Palvelut;