# beautifulSoup-backend
Part of beautifulSoup front-end

**Make sure you have the front end clone on your machine in a different directory. Here is the link to it.**
https://github.com/kishanankara/beautifulSoup

Installation:

First go to https://beta.developer.spotify.com/dashboard/ and register an app.
Set the redirect uri as http://localhost:8888/iamhome

Then export client id and client secret, 
by deafult the redirect uri will be the localhost but that can be changed.

```
export SPOTIFY_CLIENT_ID=XXXX
export SPOTIFY_CLIENT_SECRET=YYYY
```

Clone this repository.

```
git clone https://github.com/kishanankara/beautifulSoup-backend.git
```

Change directory to upliftme-backend
```
cd upliftme-backend
```

Install dependencies

```
npm install
```

Then start the backend server

```
npm start
```
