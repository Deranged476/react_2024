import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
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
      const response = await fetch('http://localhost:5000/api/users/current', {
        method: 'GET',
        credentials: 'include' // Tämä varmistaa, että evästeet (kuten JWT) lähetetään pyynnön mukana
      });

      if (!response.ok) {
        throw new Error('Käyttäjän tietojen haku epäonnistui');
      }

      const data = await response.json();
      setUserData({ username: data.user.username, bio: data.user.bio });
    } catch (error) {
      console.error('Error käyttäjän tietojen haussa', error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/users/current', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ oldPassword, newPassword })
        });

        if (response.status === 200) {
            setSuccess('Password updated successfully');
            setError('');
        } else {
            setError('Password update failed');
            setSuccess('');
        }
    } catch (error) {
        setError('Password update failed');
        setSuccess('');
    }
};

    const handleBioChange = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/users/current', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({ bio })
          });

          if (response.status === 200) {
              setSuccess('Bio updated successfully');
              setError('');
          } else {
              setError('Bio update failed');
              setSuccess('');
          }
      } catch (error) {
          setError('Bio update failed');
          setSuccess('');
      }
  };
// summit
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (newPassword !== confirmPassword) {
        alert('Uusi salasana ja sen vahvistus eivät täsmää');
        return;
      }
  
      try {
        await handlePasswordChange(); // Call password change function
        await handleBioChange(); // Call bio change function

        navigate('/palvelut'); // Redirect to profile page on success
    } catch (error) {
        console.error('Error updating user data:', error);
    }
    };

    return (
        <div>
            <h2>Muokkaa profiilia</h2>
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
                </div>
                <button type="submit">Päivitä profiili</button>
            </form>
            {error && <p className='errormessage'>{error}</p>}
            {success && <p className='successmessage'>{success}</p>}
        </div>
    );
};

export default EditUser;
