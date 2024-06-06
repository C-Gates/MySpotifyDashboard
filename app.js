const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const app = express();


const client_id = '';
const client_secret = '';
const redirect_uri = 'http://localhost:8888/callback';

const scopes = 'user-top-read';

app.get('/login', (req, res) => {
  const authUrl = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scopes,
    redirect_uri: redirect_uri,
   });
   res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
    });

    const access_tokens = tokenResponse.data.access_token;

    const topTracksResponse = await axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me/top/tracks',
      headers: {
        Authorization: 'Bearer ' + access_tokens,
      },
    });

    res.send(topTracksResponse.data);
  } catch (error) {
    res.send(error);
  }
});

app.listen(8888, () => {
  console.log('server is running on http://localhost:8888');
});
