const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get('/login', (req, res) => {
  console.log('Login route accessed');
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

router.get('/callback', (req, res) => {
  console.log('Callback route accessed');
  res.redirect('/');
});
//spotifyController.getTopTracks(req, res));

router.get('/top-tracks', spotifyController.getTopTracks);

console.log('Routes configured'); // Log for debugging

module.exports = router;