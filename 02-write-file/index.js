const fs = require('fs');
const process = require('process');
const readline = require('readline');
const path = require('path');
let location = path.join(__dirname, 'destination.txt');
const output = fs.createWriteStream(location);
const input = fs.createReadStream(location, 'utf-8');

input.on('data', chunk => output.write(chunk));
input.on('error', error => console.log('Error', error.message));

const { stdin, stdout } = process;

stdout.write('Введите текст\n');
stdin.on('data', data => {
    
if (data.toString().trim() == "exit") {
    stdout.write('Удачи!');
    process.exit();
}
output.write(data)

});

process.on('SIGINT', () => stdout.write('Удачи!'));
process.on('SIGINT', () => process.exit());
   


