import React, { useState } from 'react';

// Register-komponentti käsittelee käyttäjän rekisteröinnin
function Register() {
    // useState hook luo tilan käyttäjän tiedoille: käyttäjänimi, salasana ja bio
    const [user, setUser] = useState({ username: '', password: '', bio: '' });
    // handleChange-funktio päivittää tilan, kun käyttäjä muuttaa lomakkeen kenttää
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    // handleSubmit-funktio käsittelee lomakkeen lähetyksen

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tulostetaan rekisteröityneen käyttäjän tiedot konsoliin
        console.log('Käyttäjä rekisteröitynyt:', user);
        // Näytetään ilmoitus onnistuneesta rekisteröinnistä
        alert('Käyttäjä rekisteröityi onnistuneesti');
    };
    // Lomakkeen renderöinti
    return (
    <div>
        <h2>Rekisteröinti</h2>
         {/* Lomakkeen lähetys kutsuu handleSubmit-funktiota */}
        <form onSubmit={handleSubmit}>
            <label>
            Käyttäjänimi:
                {/* Tekstikenttä, joka päivittää username-tilan */}
                <input
                    type="text"
                    name="username"
                    value={user.username}
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
                    value={user.password}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Bio:
                {/* Tekstialue, joka päivittää bio-tilan */}
                <textarea
                    name="bio"
                    value={user.bio}
                    onChange={handleChange}
                />
            </label>
            <br />
            {/* Rekisteröinti-painike */}
            <button type="submit">Rekisteröidy</button>
        </form>
    </div>
    );
}

export default Register;

