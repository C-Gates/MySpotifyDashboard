import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './App.css';
import './App.scss';
import Button from './components/Button';
import ListItem from './components/ListItem';
import ListItemArtist from './components/ListItemArtist';

function App() {

  const [topTracks, setTopTracks] = useState([...Array(5)]);
  const [topArtists, setTopArtists] = useState([...Array(5)]);
  const [timeRange, setTimeRange] = useState('short_term');
  const [loggedIn, setLoggedIn] = useState(false);
  const port = '8888';
  const url = `${window.location.protocol}//${window.location.hostname}:${port}`

  const handleLogin = () => {
    //console.log(window.location.hostname);
    //const url = `${url}/api/spotify/login`;
    console.log(`Redirecting to: ${url}`); // Log the full URL being called
    window.location.href = `${url}/api/spotify/login`;
    setLoggedIn(true);
  };

  const fetchTopTracks = async () => {
    try {
      const response = await axios.get(`${url}/api/spotify/top-tracks`, 
      {
        headers: {
          'time_range' : timeRange
        }
      });
      setTopTracks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const fetchTopArtists= async () => {
    try {
      const response = await axios.get(`${url}/api/spotify/top-artists`,
      {
        headers: {
          'time_range' : timeRange
        }
      });
      setTopArtists(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // useEffect(() => {
  //   // Check if the user is already logged in and fetch top tracks
  //   fetchTopTracks();
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="nav">
          <Button onClick={handleLogin} text={loggedIn ? 'Logged in' : 'Log In'}/>
          <div><h1>Welcome to your Spotify Data Dashboard!</h1> </div> 
        </div>
        <div>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="short_term">Last 4 Weeks</option>
            <option value="medium_term">Last 6 Months</option>
            <option value="long_term">All Time</option>
          </select>
        </div>
        <button onClick={fetchTopTracks}>Get top tracks here</button>
        <button onClick={fetchTopArtists}>Get top artists here</button>
      </header>
      <main>
        <h3>Top Tracks</h3>
        <div className="stat-body">
          <div className="stat-container">

            <div className="stat-title">
              <h3>Top Artist</h3>
              <div className="tracklist">
                {topTracks && (
                  <ul>
                    {topTracks.map((track, index) => (
                      <ListItem item={track} index={index} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="stat-container">
          <div className="stat-title">
              <h3>Top Artist</h3>
              {topArtists && (
                  <ul>
                    {topArtists.map((artist, index) => (
                      <ListItemArtist item={artist} index={index}/>
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
