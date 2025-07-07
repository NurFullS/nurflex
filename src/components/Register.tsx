import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ onUserCreated }: { onUserCreated: () => void }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validName = /^[a-zA-Z0-9]{3,30}$/.test(username);
    if (!username || !email || !password) {
      setValid('All fields are required');
      return;
    }
    if (!validName) {
      setValid('Username must be 3-30 characters, letters and numbers only');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/users', { username, email, password });
      const user: any = res.data;

      setUsername('');
      setEmail('');
      setPassword('');
      setValid('');
      onUserCreated();

      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.id.toString());

      navigate('/', { replace: true });
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setValid('This email is already in use');
      } else {
        setValid('Failed to create user. Try again.');
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      {valid && <p style={{ color: 'red' }}>{valid}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;