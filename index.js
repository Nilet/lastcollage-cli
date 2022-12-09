const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { Headers } = fetch;
const params = require("./config.json")

//Change this to change where the files are stored
let savePath = `${process.env.HOME}/collages/`

let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const usernameArray = [...params.username]

for(let user of usernameArray){
    let temp = params
    temp.username = user
    raw = JSON.stringify(temp)
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const tempPath= savePath.concat(user, ".png");
    fetch('https://lastcollage.io/api/collage', requestOptions)
      .then(response => response.json())
      .then(({ downloadPath }) => {
        requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        return fetch(`https://lastcollage.io/${downloadPath}`, requestOptions);
      })
      .then(response => new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(path.resolve(tempPath));
        response.body.pipe(fileStream)
        response.body.on('error', reject);
        response.body.on('finish', resolve);
      }))
      .then(console.log('success'))
      .catch(error => console.log('error', error));
}
