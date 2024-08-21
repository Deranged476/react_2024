import React, { useState } from 'react';
//import axios from 'axios';

// Register-komponentti käsittelee käyttäjän rekisteröinnin
function Login() {
    // useState hook luo tilan käyttäjän tiedoille: käyttäjänimi, salasana ja bio
    const [credentials, setCredentials] = useState({ username: '', password: '', bio: '' });
    // handleChange-funktio päivittää tilan, kun käyttäjä muuttaa lomakkeen kenttää
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };
    // handleSubmit-funktio käsittelee lomakkeen lähetyksen

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tulostetaan rekisteröityneen käyttäjän tiedot konsoliin
        console.log('Käyttäjä kirjautunut sisään:', credentials);
        // Näytetään ilmoitus onnistuneesta kirjautumisesta
        alert('Kirjautuminen onnistui');
    };

    return (
    <div>
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={handleSubmit}>
        <label>
            Käyttäjänimi:
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Salasana:
                {/* Salasanojen syöttökenttä, joka päivittää password-tilan */}
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                />
            </label>
            <br />

            {/* Kirjautumispainike */}
            <button type="submit">Kirjaudu</button>
        </form>
    </div>
    );
}

export default Login;

