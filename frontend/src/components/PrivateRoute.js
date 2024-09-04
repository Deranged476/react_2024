import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
    // Tarkistetaan, onko auth-tokennia localStoragessa
    const auth = localStorage.getItem('auth1');

    // Tarkistetaan, onko tokeni kelvollinen
    var [tokenIsValid,setTokenIsValid] = useState(null);

    useEffect(() => {
        
        async function checkToken(token,handleResult) {
            try {
                // Tehdään http pyyntö, joka palauttaa boolean arvon autentikoitumisen onnistumisesta
                let response = await axios({url:"http://" + window.location.hostname + "/api/users/isLoggedIn",method:"post",headers:{"Authorization":token,"Content-Type": "application/x-www-form-urlencoded"}});
                
                // Suoritetaan parametrin funktio 
                handleResult(response.data.success); 
            } catch(err) {
                // Tulostetaan virhe konsoliin
                console.log(err);

                handleResult(false); 
            };
        }
        checkToken(auth,(tokenIsValid) => {setTokenIsValid(tokenIsValid)});
    }, []);
    
    console.log(tokenIsValid)
    return tokenIsValid ? children : tokenIsValid === null ? <p>siirrytään</p> : <Navigate to="/" />;
} 

export default PrivateRoute;
