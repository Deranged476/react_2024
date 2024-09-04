import React, { useState, useEffect} from "react";
import axios from "axios";

const EditUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    bio: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch the current user data when the component mounts
    axios
      .get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth1')}`, // Assuming token is stored in localStorage
        },
      })
      .then((response) => {
        const { username, bio } = response.data.user;
        setUserData({ username, bio, password: '' });
      })
      .catch((err) => {
        setMessage('Käyttäjän tietojen haku epäonnistui');
        setError(true);
      });
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/api/users/${userData.username}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setMessage('Profiilin päivitys onnistui');
        setError(false);
      })
      .catch((err) => {
        setMessage('Profiilin päivitys epäonnistui');
        setError(true);
      });
  };

  return (
    <div>
      <h2>Muokkaa profiilia</h2>
      {message && (
        <div className={error ? 'error' : 'success'}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Käyttäjänimi</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={userData.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Salasana</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Päivitä profiili</button>
      </form>
    </div>
  );
};

export default EditUser;