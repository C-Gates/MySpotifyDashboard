const spotifyService = require('../services/spotifyService');

exports.getTopTracks = async (req, res) => {
  try {
    const topTracks = await spotifyService.fetchTopTracks(req.query.code);
    res.json(topTracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};