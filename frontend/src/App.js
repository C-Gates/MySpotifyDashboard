import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [topTracks, setTopTracks] = useState(null);

  const handleLogin = () => {
    console.log('logging in');
    window.location.href = '/api/spotify/login';
  };

  const fetchTopTracks = async () => {
    try {
      const response = await axios.get('/api/spotify/toptracks');
      setTopTracks(response.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to your Spotify Data Dashboard!
        </p>
        <button onClick={handleLogin}>Login here</button>
        <button onClick={fetchTopTracks}>Get top tracks here</button>
      </header>
      <main>
        <h3>Top Artists</h3>
        <div className="stat-body">
          <div className="stat-container">

            <div className="stat-title">
              <h3>Top Artist</h3>
              <div className="tracklist">
                <div className="track">1. Yeah</div>
                <div className="track">2. Baby</div>
              </div>
            </div>
          </div>
          <div className="stat-container">
          <div className="stat-title">
              <h3>Top Artist</h3>
            </div>
          </div>
          <div className="stat-container">
          <div className="stat-title">
              <h3>Top Artist</h3>
              {topTracks && (
                <ul>
                  {topTracks.map(track => (
                    <li key={track.id}>{track.name}}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
