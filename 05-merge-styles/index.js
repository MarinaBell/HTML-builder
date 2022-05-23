const fs = require('fs');
const path = require('path');
let location = path.join(__dirname, 'styles'); // путь к папке со стилями
let locationForBundle = path.join(__dirname, 'project-dist', 'bundle.css'); //путь к новому файлу bundle.css
const output = fs.createWriteStream(locationForBundle); // вывод, создание потока записи в файл bundle.css

async function myReadDir(location) { // асинхронная функция принимает аргумент путь к папке
const files = await fs.promises.readdir(location); // возвращает массив имен файлов в папке

for (let i = 0; i < files.length; i++) {
  let fileName = path.join(location, files[i]);
  const stats = await fs.promises.stat(fileName);
  if (stats.isFile() && path.extname(fileName) == ".css") { // проверяем, если является файлом и имеет расширение .css

        const writePromise = await new Promise((res) => {
        const readStream = fs.createReadStream(fileName); // создание потока чтения из папки 
        
        const writeStream = fs.createWriteStream(locationForBundle, { flags: 'a'}); // создание потока записи, в файл bundle, флаг 'a' (append), чтобы файл дописывался, а не перезаписывался новым потоком
        readStream.pipe(writeStream); // поток чтения переходит в поток записи
        readStream.on('end', () => res());
    });
    await writePromise;
    }
}
}

myReadDir(location);
