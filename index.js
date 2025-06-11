const express = require('express');
const axios = require('axios');
const app = express();

app.get('/v/:twitch', async (req, res) => {
  const { twitch } = req.params;
  const { id, region } = req.query; // id = YourName#Tag

  if (!id || !region) {
    return res.status(400).send("Missing id or region");
  }

  const [user, tag] = id.split('#');

  if (!user || !tag) {
    return res.status(400).send("Invalid id format. Use YourName#Tag.");
  }

  const originalUrl = `http://zabriddev.ddns.net/valorantapi/rank/${user}/${tag}/${region}/${twitch}`;

  try {
    const response = await axios.get(originalUrl);
    let data = response.data;

    // Modify response
    const modified = `[VAL Rank] ${user}#${tag} (${region}) → ${data}`;
    res.send(modified);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Valorant rank.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Custom proxy server running on port ${port}`);
});