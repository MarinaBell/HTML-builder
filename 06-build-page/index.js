const fs = require('fs');
const path = require('path');
const locationProjectDist = path.join(__dirname, 'project-dist');

let location = path.join(__dirname, 'styles'); // путь к папке со стилями
let locationForStylesFile = path.join(__dirname, 'project-dist', 'style.css'); //путь к новому файлу style.css

const locationHtml = path.join(__dirname, 'project-dist', 'index.html');
const locationTemplate = path.join(__dirname, 'template');

const locationAssetsFirst = path.join(__dirname, 'assets');
const locationAssetsSecond = path.join(__dirname, 'project-dist', 'assets');



fs.promises.mkdir(locationProjectDist, {recursive:true}).then (function() { //создание папки project-dist
    console.log('Папка создана');
}).catch (function () {
    console.log('Папка не создана')
});

async function myReadDir(location) { // асинхронная функция принимает аргумент путь к папке
    const files = await fs.promises.readdir(location); // возвращает массив имен файлов в папке
    for (let i = 0; i < files.length; i++) {
      let fileName = path.join(location, files[i]);
      const stats = await fs.promises.stat(fileName);
      if (stats.isFile() && path.extname(fileName) == ".css") { // проверяем, если является файлом и имеет расширение .css
            const writePromise = await new Promise((res) => {
            const readStream = fs.createReadStream(fileName); // создание потока чтения из папки 
            const writeStream = fs.createWriteStream(locationForStylesFile, { flags: 'a'}); // создание потока записи, в файл bundle, флаг 'a' (append), чтобы файл дописывался, а не перезаписывался новым потоком
            readStream.pipe(writeStream); // поток чтения переходит в поток записи
            readStream.on('end', () => res());
        });
        await writePromise;
        }
    }
    }
    myReadDir(location);

    fs.promises.mkdir(locationAssetsSecond, {recursive:true}).then (function() {
        console.log('Папка создана');
    }).catch (function () {
        console.log('Папка не создана')
    });

    async function copyAssets(locationAssetsFirst) { // асинхронная функция принимает аргумент путь к папке
        const files = await fs.promises.readdir(locationAssetsFirst); // возвращает массив имен файлов в папке
        for (let i = 0; i < files.length; i++) {
          let fileName = path.join(locationAssetsFirst, files[i]);
          const stats = await fs.promises.stat(fileName);
        if (stats.isFile() ) { 

fs.readdir(locationAssetsSecond, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(locationAssetsSecond, files[i]), err => {
        if (err) throw err;
      });
    }
  });
        fs.copyFile(path.join(locationAssetsFirst, files[i]), path.join(locationAssetsSecond, files[i]), (err) => {
        });
            } else if (stats.isDirectory) {
                fs.mkdir(path.join(__dirname, 'project-dist', 'assets', files[i]),  (err) => {
                });
          }
        }
        }
        copyAssets(locationAssetsFirst);

        const output = fs.createWriteStream(locationForStylesFile); // вывод, создание потока записи в файл style.css
        // const output2 = fs.createWriteStream(locationHtml); // вывод, создание потока записи в файл index.html
        const temp = path.join(__dirname, 'template.html');
        const componentsLocation = path.join(__dirname, 'components');
        const htmlNewFile = path.join(locationHtml);

        async function myNewHtml(temp) { // асинхронная функция принимает аргумент путь к папке
        // const file = await fs.promises.readdir(temp); // возвращает массив имен файлов в папке
        // console.log(file)
        const readStream = fs.createReadStream(temp, 'utf-8');
        // readStream.on('data', chunk => console.log(chunk));
        let data = '';
        readStream.on('data', chunk => data += chunk);
        readStream.on('error', error => console.log('Error', error.message));

        const writePromise = await new Promise((res) => {
          const readStream = fs.createReadStream(temp);

          const writeStream = fs.createWriteStream(locationHtml, { flags: 'a'}); // создание потока записи, в файл html, флаг 'a' (append), чтобы файл дописывался, а не перезаписывался новым потоком
          readStream.pipe(writeStream); // поток чтения переходит в поток записи
          readStream.on('end', () => res());
        });
        await writePromise;

       }
          myNewHtml(temp);
    


      
    
    