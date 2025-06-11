const express = require('express');
const axios = require('axios');
const app = express();

app.get('/valorantapi/record/:user/:tag/:region/:twitch', async (req, res) => {
  const { user, tag, region, twitch } = req.params;

  const originalUrl = `http://zabriddev.ddns.net/valorantapi/record/${user}/${tag}/${region}/${twitch}`;

  try {
    const response = await axios.get(originalUrl);
    const raw = response.data;

    // Example raw: "qtpanini is currently down -56RR ( Going: 1W - 0D - 4L, 20.00% wr ) since the stream started. ( Currently: Immortal 3 29RR )"

    // Use regex to extract:
    const lossMatch = raw.match(/Going:\s*(\d+W)\s*-\s*(\d+D)\s*-\s*(\d+L)/);
    const rrChangeMatch = raw.match(/currently down ([+-]?\d+RR)/i);

    if (lossMatch && rrChangeMatch) {
      const [_, wins, draws, losses] = lossMatch;
      const rrChange = rrChangeMatch[1];

      const formatted = `${twitch} is currently ${wins} - ${draws} - ${losses} since the stream started and is down ${rrChange}`;
      res.send(formatted);
    } else {
      // Fallback: just return the original message
      res.send(`[unformatted fallback] ${raw}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch or format record.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
