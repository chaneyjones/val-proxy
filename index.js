const express = require('express');
const axios = require('axios');
const app = express();

app.get('/valorantapi/record/:user/:tag/:region/:twitch', async (req, res) => {
  const { user, tag, region, twitch } = req.params;

  const originalUrl = `http://zabriddev.ddns.net/valorantapi/record/${user}/${tag}/${region}/${twitch}`;

  try {
    const response = await axios.get(originalUrl);
    const raw = response.data;

    // Example raw:
    // "qtpanini is currently up 54RR ( Going: 3W - 0D - 1L, 75.00% wr ) since the stream started. ( Currently: Immortal 3 392RR )"

    // Match the "Going: xW - yD - zL"
    const lossMatch = raw.match(/Going:\s*(\d+)W\s*-\s*(\d+)D\s*-\s*(\d+)L/i);

    // Match both "currently up/down XXRR"
    const rrChangeMatch = raw.match(/currently (up|down)\s+([+-]?\d+RR)/i);

    if (lossMatch && rrChangeMatch) {
      const [_, wins, draws, losses] = lossMatch;
      const direction = rrChangeMatch[1]; // "up" or "down"
      const rrAmount = rrChangeMatch[2];  // e.g., "54RR"

      const formatted = `${twitch} is currently ${direction} ${rrAmount} ( Going: ${wins}W - ${draws}D - ${losses}L ) since the stream started.`;
      res.send(formatted);
    } else {
      // Fallback to the raw string if parsing fails
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
