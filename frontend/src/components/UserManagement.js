import React, { useState, useEffect} from "react";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', bio: ''});
    const [editingUser, setEditingUser,] = useState(null);

    useEffect(() => {
        setUsers([
            { username: 'Jouni React', bio: 'Tämä on Jounin henkilökohtainen kuvaus (bio).'}, 
            { username: 'Jaana React', bio: 'Tämä on Jaanan henkilökohtainen kuvaus (bio).' }
        ]);
    }, []);

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            // Jos ollaan muokkaustilassa, päivitetään olemassa oleva käyttäjä 
            setUsers(users.map(user => (user.username === editingUser.username ? newUser : user)));
            setEditingUser(null);
        } else {
            // Muussa tapauksessa lisätään uusi käyttäjä
            setUsers([...users, newUser]);
        }
        // Tyhjennetään lomake
        setNewUser({ username: '', bio: '' });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setNewUser({ username: user.username, bio: user.bio });
    };

    // handleDelete-funktio poistaa käyttäjän listasta
    const handleDelete = (username) => {
        setUsers(users.filter(user => user.username !== username));
    };

    // Komponentin renderöinti
    return (
        <div>
            <h1>Käyttäjien hallinta</h1>
            {/* Lomakkeen lähetys kutsuu handleSubmit-funktiota */}
            <form onSubmit={handleSubmit}>
            <label>
                Käyttäjänimi:
                {/* Tekstikenttä, joka päivittää username-tilan ja estää muokkaamisen päivitystilan aikana */}
                <input
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleChange}
                    disabled={!!editingUser}
                />
            </label>
            <br />
            <label>
                Bio:
                {/* Tekstialue, joka päivittää bio-tilan */}
                <textarea
                    name="bio"
                    value={newUser.bio}
                    onChange={handleChange}
                />
            </label>
            <br />
            {/* Lomakkeen lähetyspainike, joka vaihtaa tekstinsä päivitys- tai lisäystilanteen mukaan */}
            <button type="submit">{editingUser ? 'Update User' : 'Lisää Käyttäjä'}</button>
        </form>
        <h2>Käyttäjäluettelo</h2>
        {/* Käyttäjälistan renderöinti */}
        <ul>
            {users.map(user => (
                <li key={user.username}>
                    {user.username}: {user.bio}
                    {/* Edit-painike, joka mahdollistaa käyttäjän muokkaamisen */}
                    <button onClick={() => handleEdit(user)}>Muokkaa</button>
                    {/* Delete-painike, joka poistaa käyttäjän */}
                    <button onClick={() => handleDelete(user.username)}>Poista</button>
                </li>
            ))}
        </ul>
    </div>
    );

}

export default UserManagement;