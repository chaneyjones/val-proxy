Valorant Proxy

A lightweight Node.js + Express proxy server that fetches and reformats Valorant ranked session data from a third-party API for use with Nightbot (Twitch chat integration).

Features

Proxies requests to the original Valorant API

Parses wins, draws, and losses from the response

Extracts current RR (Rank Rating) change (up/down)

Outputs a formatted, Nightbot-ready string

Provides fallback to raw response if parsing fails

Example Endpoint
GET /valorantapi/record/:user/:tag/:region/:twitch

Parameters

user: Riot username 

tag: Riot tagline (e.g., NA1)

region: Region code (e.g., na, eu, ap)

twitch: Twitch username for display in output

Example Request

/valorantapi/record/RIOTNAME/NA1/na/TWITCHNAME


Example Raw Response (from original API)

"TWITCHNAME is currently up 54RR ( Going: 3W - 0D - 1L, 75.00% wr ) since the stream started. ( Currently: Immortal 3 392RR )"


Formatted Response (from proxy)

TWITCHNAME is currently up 54RR ( Going: 3W - 0D - 1L ) since the stream started.


If parsing fails, the response falls back to:

[unformatted fallback] <original API string>

Installation

Clone the repository:



Install dependencies:

npm install


Start the server:

npm start


The server will run on http://localhost:3000 by default.

Deployment

Can be deployed on Render, Heroku, or any Node.js hosting platform

Update Nightbot command to fetch from your deployed URL:

!addcom !valorant $(urlfetch https://your-deployed-app/valorantapi/record/USER/TAG/REGION/TWITCH)

Tech Stack

Node.js + Express (server)

Axios (HTTP requests)

Nightbot/Twitch integration (usage target)
