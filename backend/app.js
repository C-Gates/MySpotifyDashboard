const express = require('express');
const bodyParser = require('body-parser');
const spotifyRoutes = require('./routes/spotifyRoutes');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/api/spotify', spotifyRoutes);

module.exports = app;
