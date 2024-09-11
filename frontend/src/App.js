import React from 'react';
//import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'; alkuperäinen import, tällä sovellu ei toimi
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Switch paikkalle Routes

import Register from './components/Register';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import Palvelut from './components/Palvelut';
import PrivateRoute from './components/PrivateRoute';
import EditUser from './components/UserEdit';

import './App.css';

// App-komponentti on sovelluksen pääkomponentti
function App() {
    return (
        <Router>
            <div className="App">
                <h1>Käyttäjien hallintajärjestelmä</h1>
                {/* Navigointipalkki */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Kotisivu</Link>
                        </li>
                        <li>
                            <Link to="/rekisterointi">Rekisteröinti</Link>
                        </li>
                        <li>
                            <Link to="/kirjautuminen">Kirjautuminen</Link>
                        </li>
                        <li>
                            <Link to="/kayttajat">Käyttäjien hallinta</Link>
                        </li>
                    </ul>
                </nav>

                {/* Reititykset */}
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h2>Tervetuloa käyttäjien hallintajärjestelmään</h2>
                            <p>Ole hyvä ja navigoi käyttämällä yllä olevaa valikkoa.</p>
                            <p>tämä on testi</p>
                        </div>
                    } />
                    <Route path="/rekisterointi" element={<Register />} />
                    <Route path="/kirjautuminen" element={<Login />} />
                    <Route path="/kayttajat" element={<UserManagement />} />
                    {/*<Route path='/palvelut' element={<Palvelut/>} />*/}
                    {/*<Route path='/muokkaus' element={<EditUser/>} />*/}
                    <Route path="/palvelut" element={<PrivateRoute><Palvelut /></PrivateRoute>} />
                    <Route path="/muokkaus" element={<PrivateRoute><EditUser /></PrivateRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;