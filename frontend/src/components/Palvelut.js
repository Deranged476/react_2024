import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import querystring from 'querystring';
import axios from "axios";
import '../App.css'

function Palvelut() {
    const navigate = useNavigate();

    const [username,setUsername] = useState(null);

    useEffect(() => {
        
        var token = localStorage.getItem("auth1");
        console.log(token);
        if(token) {
            // Tarkistetaan onko käyttäjä kirjatunut sisään
            axios({url:"http://" + window.location.hostname + ":5000/api/users/isLoggedIn",method:"post",headers:{"Authorization":token,"Content-Type": "application/x-www-form-urlencoded"}})
            .then((response) => {
            setUsername(response.data.username);
            })
            .catch((err) => {
            // Tulostetaan virhe konsoliin
            console.log(err);
            });
        } 
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth1');  // Poistetaan auth-token localStoragesta
        console.log('Käyttäjä on kirjautunut ulos');
        navigate('/kirjautuminen');  // Ohjataan käyttäjä takaisin kirjautumissivulle
    };

    const manageProfile = () => {
        // Lisätään haluttu toiminnallisuus profiilin hallintaan
        console.log('Profiilin hallinta avattu');
        navigate('/kayttajat');
    };

    const performAction = () => {
        // Lisätään haluttu toiminnallisuus toiminnon suorittamiseen
        console.log('Toiminto suoritettu');
    };

    return (
        <div>
            <h1>Palvelusivu</h1>
            <p>Tervetuloa palvelusivulle!</p>

            { username &&
            (<><div className="user-info">
                <h2>Käyttäjän tiedot</h2>
                <p>Täällä voit tarkastella ja hallita tietojasi.</p>
                <button onClick={manageProfile}>Hallitse profiilia</button>
            </div>

            <div className="actions">
                <h2>Toiminnot</h2>
                <h3>Tarjoamme erilaisia toimintoja kirjautuneille käyttäjille.</h3>

                <p>Joku toiminto</p>
                <button onClick={performAction}>Suorita toiminto</button>
            </div>

            <div className="logout">
                <p>Kirjaudu ulos</p>
                <button onClick={handleLogout}>Kirjaudu ulos</button>
            </div></>)
            }
        </div>
    );
}

export default Palvelut;