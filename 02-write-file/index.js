const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'notes.txt'), 'utf-8');

const { stdin, stdout } = process;

stdout.write('Введите текст: \n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    console.log('Удачи!');
    process.exit();
  } else {
    output.write(data);
  }
});

process.on('SIGINT', () => {
  console.log('Удачи!');
  process.exit();
});
