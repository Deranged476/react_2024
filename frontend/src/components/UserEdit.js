import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 

const EditUser = () => {
    const [userData, setUserData] = useState({ username: '', bio: '' });
    //const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

// haku
    useEffect(() => {
      fetchUserData();
    }, []);
    const fetchUserData = async () => {
        try {
            // Oletetaan, että token on saatavilla tästä muuttujasta
            const token = 'token1'; // Korvaa tämä oikealla tokenilla
    
            const response = await axios.get('https://' + window.location.hostname + '/api/users/current', {   
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Authorization otsikko lisätty
                    withCredentials: true
                }
            });
    
            // Asetetaan käyttäjätiedot
            setUserData({ username: response.data.user.username, bio: response.data.user.bio });
        } catch (error) {
            console.error('Error käyttäjän tietojen haussa:', error);
            setError('Virhe käyttäjän tietojen haussa');
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            await axios.put('https://' + window.location.hostname + ':5000/api/users/current', 
                { oldPassword, newPassword },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            setSuccess('Password updated successfully');
            setError('');
        } catch (error) {
            setError('Password update failed');
            setSuccess('');
            console.error('Error updating password:', error);
        }
    };

    const handleBioChange = async () => {
        try {
            await axios.put('https://' + window.location.hostname + ':5000/api/users/current', 
                { bio },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            setSuccess('Bio updated successfully');
            setError('');
        } catch (error) {
            setError('Bio update failed');
            setSuccess('');
            console.error('Error updating bio:', error);
        }
    }

    const updateUser = async (updates) => {
        try {
            await axios.put('https://' + window.location.hostname + ':5000/api/users/current', 
                updates,
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            setSuccess('Update successful');
            setError('');
        } catch (error) {
            setError('Update failed');
            setSuccess('');
            console.error('Error updating user data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('New password and its confirmation do not match');
            return;
        }

        const updates = {};
        if (oldPassword || newPassword) {
            updates.password = { oldPassword, newPassword };
        }
        if (bio) {
            updates.bio = bio;
        }

        try {
            if (oldPassword || newPassword) {
                await handlePasswordChange();
            }
            if (bio) {
                await handleBioChange();
            }
            await updateUser(updates);

            navigate('/palvelut'); 
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div>
            <h2>Muokkaa profiilia</h2>
            {error && <p className='errormessage'>{error}</p>}
            {success && <p className='successmessage'>{success}</p>}
            {userData.username && <h3>{userData.username}</h3>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Vanha salasana:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Uusi salasana:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Vahvista uusisalasana:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Bio:</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div><br></br>
                <button type="submit">Päivitä profiili</button>
            </form>

        </div>
    );
};

export default EditUser;
