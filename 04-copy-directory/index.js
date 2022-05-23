const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const locationFirst = path.join(__dirname, 'files');
const locationSecond = path.join(__dirname, 'files-copy');
fs.promises.mkdir(locationSecond, {recursive:true}).then (function() {
    console.log('Папка создана');
}).catch (function () {
    console.log('Папка не создана')
});

fs.readdir(locationSecond, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(__dirname, 'files-copy', file), err => {
        if (err) throw err;
      });
    }
  });
  
fs.readdir(path.join(locationFirst), (err, files) => {
    if (err) throw err;
    files.forEach (file => {
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
        });
    })
})


