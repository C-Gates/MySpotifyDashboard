require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/api/spotify/login`);
  //console.log();s
})