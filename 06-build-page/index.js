const fs = require('fs');
const path = require('path');
const locationProjectDist = path.join(__dirname, 'project-dist');

let location = path.join(__dirname, 'styles'); // путь к папке со стилями
let locationForStylesFile = path.join(__dirname, 'project-dist', 'style.css'); //путь к новому файлу style.css

const locationHtml = path.join(__dirname, 'project-dist', 'index.html');
// const locationTemplate = path.join(__dirname, 'template');

const locationAssetsFirst = path.join(__dirname, 'assets');
const locationAssetsSecond = path.join(__dirname, 'project-dist', 'assets');
const locationCompFolder = path.join(__dirname, 'components');


fs.promises.mkdir(locationProjectDist, {recursive:true}).then (function() { //создание папки project-dist
    // console.log('Папка создана');
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
        // console.log('Папка создана');
    }).catch (function () {
        console.log('Папка не создана')
    });

  async function copyAssets(locationAssetsFirst, locationAssetsSecond) { // асинхронная функция принимает аргумент путь к папке
      const files = await fs.promises.readdir(locationAssetsFirst); // возвращает массив имен файлов в папке
      for (let i = 0; i < files.length; i++) {
       
        // console.log(files[i])
        let file = path.join(locationAssetsFirst, files[i]);
        // console.log(file)
        const stats = await fs.promises.stat(file);
        let fileCopy = path.join(locationAssetsSecond, files[i])
        // console.log((path.join(__dirname, locationAssetsSecond, files[i])))
      if (stats.isFile()) { 

      fs.copyFile(file, fileCopy, (err) => {
       
      });
          } else {
              fs.mkdir(path.join(locationAssetsSecond, files[i]),{ recursive: true },  (err) => {
                copyAssets(file, fileCopy);
              });
        }
      }
}
        copyAssets(locationAssetsFirst, locationAssetsSecond);

        const output = fs.createWriteStream(locationForStylesFile); // вывод, создание потока записи в файл style.css
        const temp = path.join(__dirname, 'template.html');
        const componentsLocation = path.join(__dirname, 'components');
        const htmlNewFile = path.join(locationHtml);

        async function myNewHtml(temp) { // асинхронная функция принимает аргумент путь к папке
        // const file = await fs.promises.readdir(temp); // возвращает массив имен файлов в папке
        const readStream = fs.createReadStream(temp, 'utf-8');
        // readStream.on('data', chunk => console.log(chunk));
        let data = '';
        readStream.on('data', chunk => data += chunk);
        readStream.on('error', error => console.log('Error', error.message));

        const writePromise = await new Promise((res) => {
          const readStream = fs.createReadStream(temp);

          const writeStream = fs.createWriteStream(locationHtml, { flags: 'a'}); 
          readStream.pipe(writeStream); 
          readStream.on('end', () => res());
        });
        await writePromise;

        let template = await fs.promises.readFile(path.resolve(__dirname, 'template.html'));
        template = template.toString();
        // console.log(template)
        
        const compNames = template.match(/(?<=\{\{).+(?=\}\})/g);
        // console.log(compNames);
        for(let i = 0; i < compNames.length; i++){
          // console.log(compNames[i]);

          const compContent = await fs.promises.readFile(path.join(__dirname, 'components', `${compNames[i]}.html`));
          
          template = template.replace(`{{${compNames[i]}}}`, compContent);
          // console.log(template)
          
          await fs.promises.writeFile(path.resolve(locationProjectDist, 'index.html'), template);

          // await fs.promises.writeFile(path.join(locationHtml));
        }
   

      }

        
          myNewHtml(temp);
         
    


      
    
    