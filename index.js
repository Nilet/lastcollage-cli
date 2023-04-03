const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { Headers } = fetch;
const params = require('./config.json');
const usernameArray = [...params.username];

// Change this to change where the files are stored
const savePath = `${process.env.HOME}/collages/`;

const createCollage = async (user) => {
    let temp = params;
    temp.username = user;
    raw = JSON.stringify(temp);
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw,
        redirect: 'follow',
    };

    const tempPath = `${savePath}${user}.png`;
    try {
        const response = await fetch('https://lastcollage.io/api/collage', requestOptions);
        const { downloadPath } = await response.json();
        requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        const fileResponse = await fetch(`https://lastcollage.io/${downloadPath}`, requestOptions);
        const fileStream = fs.createWriteStream(path.resolve(tempPath));
        fileResponse.body.pipe(fileStream);
        fileResponse.body.on('error', (error) => {
            console.log('Error:', error);
            reject(error);
        });
        fileResponse.body.on('finish', () => console.log("Collage created"));
    } catch (error) {
        console.log('Error:', error);
    }
};

function main() {
    if (!fs.existsSync(savePath)) {
        console.log("Creating collages folder")
        try {
            fs.mkdirSync(savePath);
        } catch (e) {
            console.error("Error creating folder: ", e);
        }
    }

    for (const user of usernameArray) {
        createCollage(user);
    }
}

main()
