import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  const calculateAge = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/calculate-age`, {
        birth_date: birthDate
      });
      setAge(response.data.age);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setAge(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Birthday Calculator</h1>
        <form onSubmit={calculateAge}>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
          <button type="submit">Calculate Age</button>
        </form>
        {age !== null && <p>Your age is: {age} years</p>}
        {error && <p className="error">{error}</p>}
      </header>
    </div>
  );
}

export default App;