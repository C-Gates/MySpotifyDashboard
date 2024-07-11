const axios = require('axios');
const querystring = require('querystring');
const { clientId, clientSecret, redirectUri } = require('../config/config');

exports.fetchAccessToken = async (code) => {
  try {
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
    return tokenResponse.data.access_token;

  } catch (error) {
    console.log('Error getting access token: ', error);
    resizeBy.status(500).send('Error getting access token');
  }
}

exports.fetchTopTracks = async (accessToken, code, timeRange) => {
    try {
      console.log('fetching...');
      const params = {
        type: 'tracks',
        limit: '5',
        time_range: timeRange
      };
      const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        params: params,
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      });

      //console.log(topTracksResponse.data.items[0]);
      //console.log(typeof(topTracksResponse.data.items[0].album.images));
  
      const topTracks = topTracksResponse.data.items.map(track => ({
        name: track.name,
        album: track.album.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        image: track.album.images
        //url: track.external_urls.spotify,
      }));
      console.log(topTracks[1]);
  
      return topTracks;
  }
  catch (error) {
    console.error('Error fetching top tracks:', error.message);
    throw new Error('Failed to fetch top tracks');
  }
}


exports.fetchTopArtists = async (accessToken, code, timeRange) => {
  try {
    console.log('fetching...');
    const params = {
      type: 'artists',
      limit: '5',
      time_range: timeRange
    };
    const topArtistsResponse = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      params: params,
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    });

    //console.log(topArtistsResponse.data.items[0]);

    const topArtists= topArtistsResponse.data.items.map(artist => ({
      name: artist.name,
      image: artist.images,
      //url: track.external_urls.spotify,
    }));
    console.log(topArtists[1]);

    return topArtists;
}
catch (error) {
  console.error('Error fetching top artists:', error.message);
  throw new Error('Failed to fetch top artists');
}
}



// exports.fetchTopTracks = async (code) => {
//   try {
//     const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: redirectUri,
//     }), {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
//       },
//     });

//     const accessToken = tokenResponse.data.access_token;
//     console.log('fetching...');
//     const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
//       headers: {
//         'Authorization': 'Bearer ' + accessToken,
//       },
//     });

//     //return topTracksResponse.data;

//     const topTracks = topTracksResponse.data.items.map(track => ({
//       name: track.name,
//       //album: track.album.name,
//       //artist: track.artists.map(artist => artist.name).join(', '),
//       //url: track.external_urls.spotify,
//     }));
//     console.log(topTracks);

//     return topTracks;
//   }
//   catch (error) {
//     console.error('Error fetching top tracks:', error.message);
//     throw new Error('Failed to fetch top tracks');
//   }
// }