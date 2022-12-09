# lastcollage-cli: Command Line Last.fm Collage Generator
![Example collage](https://lastcollage.io/images/6ae22bff075de478d971fa062f237e550fb3514c.webp "Example collage")

# Introduction
This a [Fork](https://github.com/awhite/lastcollage-cli)

For a web-based UI, check out [Lastcollage](https://lastcollage.io).

This script generates a collage based on your Last.fm scrobbles, and saves it as a PNG image.


# Prerequisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0 or higher

# Getting started
- Clone the repository
```
git clone https://github.com/Nilet/lastcollage-cli.git
```
- Install dependencies
```
cd lastcollage-cli
npm install
```
- Edit `config.json` to configure the collage generated 
```javascript
  {
    "username": ["lastfm_username", "separated_by_comma"], 
    "period": "1week",    // Accepted values: "forever", "1week", "1month", "3month", "6month", "1year"
    "rowNum": "5",          // Supports integer values in the range of [1, 20]
    "colNum": "5",          // Same as above
    "type": "albums",       // Accepted values: "albums", "artists", "tracks"
    "showName": "false",    // "true" or "false"
    "hideMissing": "false"  // "true" or "false"
  }

```

- Edit `index.js` and change the following line to alter the save path

```javascript
//Change this to change where the files are stored
let savePath = `${process.env.HOME}/collages/`
```

- Run the script
```
npm start
```
  The file will be saved in the location you specified.

  # Changes
  - Config file is now a JSON
  - Supports an array of users instead of a single user
  - Save collage image with the user name instead of a number

