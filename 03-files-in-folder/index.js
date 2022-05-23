const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  {
    withFileTypes: true,
  },
  (error, files) => {
    if (error) console.error(error.message);
    files.forEach((file) => {
      const arr = [];
      if (file.isFile() === false) {
        return;
      }
      const name = file.name.split('.')[0];
      const extension = path.extname(file.name).split('.')[1];
      const filePath = path.join(__dirname, 'secret-folder', `${file.name}`);
      fs.stat(filePath, (error, stats) => {
        if (error) console.error(error.message);
        const size = `${stats.size}b`;
        arr.push(name, extension, size);
        console.log(arr.join(' - '));
      });
    });
  },
);
