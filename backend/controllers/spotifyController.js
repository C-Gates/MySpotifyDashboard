const spotifyService = require('../services/spotifyService');

exports.getTopTracks = async (req, res) => {
  console.log('top tracks accessed');
  try {
    const topTracks = await spotifyService.fetchTopTracks(req.query.code);
    res.json(topTracks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};