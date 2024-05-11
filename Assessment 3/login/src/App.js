import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [inputClass, setInputClass] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setMessage(response.data.message);
      if (response.data.message === 'Login successful') {
        setInputClass('success');
      } else {
        setInputClass('error');
      }
    } catch (error) {
      setMessage('Login failed');
      setInputClass('error');
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    // Check if value contains numbers
    if (!/\d/.test(value)) {
      setUsername(value);
    }
  };

  return (
    <div className={`form ${inputClass}`}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange} 
        className={inputClass}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
      />
      <button onClick={handleLogin}>Login</button>
      <p style={{ textAlign: 'center', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>
    </div>
  );
}

export default App;
