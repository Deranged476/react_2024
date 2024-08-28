import React, { useState } from 'react';
import axios from 'axios';
import querystring from "querystring";
import '../App.css'

// Register-komponentti käsittelee käyttäjän rekisteröinnin
function Login() {
    // useState hook luo tilan käyttäjän tiedoille: käyttäjänimi, salasana ja bio
    const [credentials, setCredentials] = useState({ username: '', password: '', bio: '' });
    const [errormessage, setError] = useState('')
    const [successmessage, setSuccessMessage] = useState('')
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
        if (credentials.username.length === 0){
            setError(' lisää käyttäjänimi')
        } else if (credentials.password.length === 0){
            setError(' lisää salasana')
        } else {
        axios({url:"http://localhost:5000/api/users/login",method:"post",data:querystring.stringify(credentials),headers:{"Content-Type": "application/x-www-form-urlencoded"}})
    .then((response) => {
        console.log(response.data);
        console.log(response.status);
        setSuccessMessage(' käyttäjän lisääminen onnistui');
        localStorage.setItem('auth1', response.token)
    })
    .catch((err) => {
      // Tulostetaan virhe konsoliin
      console.log(err);
      setError(' käyttääjän lisääminen epäonnistui')
    });
    }};

    return (
    <div>
        <h2>Kirjaudu sisään</h2>
            {errormessage.length && (<p className='errormessage'> Rekisteröinti epäonnistui {errormessage} </p>)}
            {successmessage.length && (<p className='successmessage'> Rekisteröinti onnistui {successmessage} </p>)}
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

