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
            const token = localStorage.getItem('auth1'); 
            const response = await axios({url:"https://" + window.location.hostname + "/api/users/current", method:"get", headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token}})
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
            const token = localStorage.getItem('auth1'); 
            await axios({url:"https://" + window.location.hostname + "/api/users/current", method:"put",
                data:{ oldPassword, newPassword },
                 headers: { 'Content-Type': 'application/json' ,'Authorization': token
                 }}
            );
            setSuccess('Password updated successfully');
            setError('');
        } catch (error) {
            setError('Password update failed');
            setSuccess('Password update success');
            console.error('Error updating password:', error);
        }
    };

    const handleBioChange = async () => {
        try {
            const token = localStorage.getItem('auth1');
            await axios({url:"https://" + window.location.hostname + "/api/users/current", method:"put", data:{"bio":bio}, 
                headers: { 'Content-Type': 'application/json', 'Authorization': token  }})
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
            const token = localStorage.getItem('auth1');
            await axios({url:'https://' + window.location.hostname + '/api/users/current', method:"put",
                data:updates,
                 headers: { 'Content-Type': 'application/json' }, 'Authorization': token }
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
