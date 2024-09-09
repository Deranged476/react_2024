import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            setError('Uudet salasanat eivät täsmää');
            return;
        }

        try {
            const response = await axios.put('http://localhost:5000/api/users/password', {
                oldPassword,
                newPassword,
            });

            if (response.status === 200) {
                setSuccess('Salasanan päivitys onnistui');
                setError('');
            }
        } catch (error) {
            setError('Salasanan päivitys epäonnistui');
            setSuccess('');
        }
    };

    const handleBioChange = async () => {
        try {
            const response = await axios.put('http://localhost:5000/api/users/bio', { bio });

            if (response.status === 200) {
                setSuccess('Bion päivitys onnistuiy');
                setError('');
            }
        } catch (error) {
            setError('Bio päivitys epäonnistui');
            setSuccess('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (oldPassword || newPassword || confirmPassword) {
            await handlePasswordChange();
        }

        if (bio) {
            await handleBioChange();
        }
    };

    return (
        <div>
            <h2>Muokkaa profiilia</h2>
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
                </div>
                <button type="submit">Päivitä profiili</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default EditUser;
