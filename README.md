# beautifulSoup-backend
Part of beautifulSoup front-end

**Make sure you have the front end clone on your machine in a different directory. Here is the link to it.**
https://github.com/kishanankara/beautifulSoup

Installation:

**IMPORTANT
You need to install MongoDB. There isn't any interaction with the MongoDB servers through the backend currently. But the backend server is ready to handle CRUD requests.**

Please contact the [team](https://gitter.im/beautiful_Soup/Lobby) if there are any issues.

[Installation](https://docs.mongodb.com/manual/installation/) for MongoDB 

First go to https://beta.developer.spotify.com/dashboard/ and register an app.
Set two redirect uris as http://localhost:8888/iamhome and http://localhost:8888/logger

Then export client id and client secret, 
by deafult the redirect uri will be the localhost but that can be changed. 
**Exports to local environment should be in the same terminal session.**

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

At this point make sure your local Mongo server is running. Then start the backend server.

```
npm start
```
