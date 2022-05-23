const fs = require('fs');
const path = require('path');
let location = path.join(__dirname, 'secret-folder');

async function myReadDir(pathFolder) {
const files = await fs.promises.readdir(pathFolder);
for (let i = 0; i < files.length; i++) {
const pathToFile = path.resolve(pathFolder, files[i]);
fs.stat(pathToFile, ((err, stats) => {
  if(stats.isFile()) {
      console.log(`${(files[i]).split('.')[0]} - ${path.extname(files[i]).split('.')[1]} - ${stats.size}b`);
    }
}))
      }

}

myReadDir(location);



