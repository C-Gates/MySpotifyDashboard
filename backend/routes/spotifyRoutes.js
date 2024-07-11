const express = require('express');
const router = express.Router();
const spotifyService = require('../services/spotifyService');
//const spotifyController = require('../controllers/spotifyController');

let accessToken = null;
let code = null;

router.get('/login', (req, res) => {
  const scopes = 'user-top-read';
  const { clientId, redirectUri } = require('../config/config');
  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
  })}`;
  res.redirect(authUrl);
})

// front end connection
router.get('/callback', async (req, res) => {
  try {
    code = req.query.code;
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }
    accessToken = await spotifyService.fetchAccessToken(code);
    res.redirect('http://localhost:3000');
  } 
  
  catch (error) {
    console.error('Callback route error getting token:', error.message);
    res.status(500).json({ error: error.message }); // Send error response
  }
});

// Route to fetch top tracks
router.get('/top-tracks', async (req, res) => {
  try {
    const timeRange = req.headers['time_range'];
    const topTracks = await spotifyService.fetchTopTracks(accessToken, code, timeRange);
    res.json(topTracks);
  }
  
  catch (error) {
    console.error('Error fetching top tracks:', error);
    res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
});

// Route to fetch top artists
router.get('/top-artists', async (req, res) => {
  try {
    const timeRange = req.headers['time_range'];
    const topArtists = await spotifyService.fetchTopArtists(accessToken, code, timeRange);
    res.json(topArtists);
  }
  
  catch (error) {
    console.error('Error fetching top artists:', error);
    res.status(500).json({ error: 'Failed to fetch top artists' });
  }
});

module.exports = router;