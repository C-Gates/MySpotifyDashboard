const express = require('express');
//const axios = require('axios');
//const querystring = require('querystring');
const bodyParser = require('body-parser');
const spotifyRoutes = require('./routes/spotifyRoutes');

const app = express();
console.log('here??');

// const client_id = '4910cfdeab17458b96f46e01e7e18a6b';
// const client_secret = '7b45ad4dbbf14c6a8ac4a944a029c4fe';
// const redirect_uri = 'http://localhost:8888/callback';

app.use(bodyParser.json());
app.use('/api/spotify', spotifyRoutes);
//console.log(`and ${client_Id}`);
module.exports = app;

// const scopes = 'user-top-read';

// app.get('/login', (req, res) => {
//   const authUrl = 'https://accounts.spotify.com/authorize?' +
//   querystring.stringify({
//     response_type: 'code',
//     client_id: client_id,
//     scope: scopes,
//     redirect_uri: redirect_uri,
//    });
//    res.redirect(authUrl);
// });

// app.get('/callback', async (req, res) => {
//   const code = req.query.code || null;

//   try {
//     const tokenResponse = await axios({
//       method: 'post',
//       url: 'https://accounts.spotify.com/api/token',
//       data: querystring.stringify({
//         grant_type: 'authorization_code',
//         code: code,
//         redirect_uri: redirect_uri,
//       }),
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
//       },
//     });

//     const access_tokens = tokenResponse.data.access_token;

//     const topTracksResponse = await axios({
//       method: 'get',
//       url: 'https://api.spotify.com/v1/me/top/tracks',
//       headers: {
//         Authorization: 'Bearer ' + access_tokens,
//       },
//     });

//     res.send(topTracksResponse.data);
//   } catch (error) {
//     res.send(error);
//   }
// });


// const PORT = process.env.PORT || 8888;
// app.listen(8888, () => {
//   console.log(`server is running on ${PORT}`);
// });
