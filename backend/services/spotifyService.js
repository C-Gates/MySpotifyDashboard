const axios = require('axios');
const querystring = require('querystring');
const { clientId, clientSecret, redirectUri } = require('../config/config');


exports.fetchTopTracks = async (code) => {
  const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
  });

  const accessToken = tokenResponse.data.access_token;

  const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  });

  //return topTracksResponse.data;

  const topTracks = topTracksResponse.data.items.map(track => ({
    name: track.name,
    album: track.album.name,
    artist: track.artists.map(artist => artist.name).join(', '),
    url: track.external_urls.spotify,
  }));

  return topTracks;
}