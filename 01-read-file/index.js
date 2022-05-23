const fs = require('fs');
const path = require('path');
let location = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(location, 'utf-8');
stream.on('data', chunk => console.log(chunk));
let data = '';
stream.on('data', chunk => data += chunk);
// stream.on('end', () => console.log('End', data));
stream.on('error', error => console.log('Error', error.message));



