
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestConnection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  
  // NOTE: You'll need to replace this with a real token from a successful login
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU0ODk4MjgzLCJleHAiOjE3NTQ5MDE4ODN9.tyDx5Ev_WKTDiArYWUp0QZn8k5vyZMUdEJxLkdWeHzY';

  useEffect(() => {
    // This function makes the API call to your backend
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error connecting to the backend');
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Backend Connection Test</h1>
      {data ? (
        <div>
          <p>Connection successful! Data received:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading... {error}</p>
      )}
    </div>
  );
};

export default TestConnection;