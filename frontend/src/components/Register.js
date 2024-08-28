import React, { useState, /*useEffect*/ } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import '../App.css'

// Register-komponentti käsittelee käyttäjän rekisteröinnin
function Register() {
    // useState hook luo tilan käyttäjän tiedoille: käyttäjänimi, salasana ja bio
    const [user, setUser] = useState({ username: '', password: '', bio: '' });
    const [errormessage, setError] = useState('')
    const [successmessage, setSuccessMessage] = useState('')
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
        if (user.username.length === 0){
            setError(' lisää käyttäjänimi')
        } else if (user.password.length === 0){
            setError(' lisää salasana')
        } else {
        axios({url:"http://localhost:5000/api/users/",method:"post",data:querystring.stringify(user),headers:{"Content-Type": "application/x-www-form-urlencoded"}})
    .then((response) => {
        console.log(response.data);
        console.log(response.status);
        setSuccessMessage(' kirjautuminen onnistui');
    })
    .catch((err) => {
      // Tulostetaan virhe konsoliin
      //console.log(err);
      setError(' kirjautuminen epäonnistui')
    });
}};
    // Lomakkeen renderöinti
    return (
    <div>
        <h2>Rekisteröinti</h2>
            {/* Lomakkeen lähetys kutsuu handleSubmit-funktiota */}
            {errormessage.length && (<p className='errormessage'> Rekisteröinti epäonnistui {errormessage} </p>)}
            {successmessage.length && (<p className='successmessage'> Rekisteröinti onnistui {successmessage} </p>)}
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

