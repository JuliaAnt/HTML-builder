const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

(async function () {
  const folder = path.join(__dirname, 'files');
  const copyFolder = path.join(__dirname, 'files-copy');
  await fsPromises.mkdir(copyFolder, { recursive: true });
  await fsPromises.rm(copyFolder, { recursive: true });
  await fsPromises.mkdir(copyFolder, { recursive: true });

  fs.readdir(folder, { withFileTypes: true }, (error, files) => {
    if (error) console.error(error.message);
    files.forEach((file) => {
      if (file.isDirectory()) {
        fsPromises.mkdir(
          `${copyFolder}/${file.name}`,
          { recursive: true },
          () => {},
        );
        fs.readdir(
          `${folder}/${file.name}`,
          { withFileTypes: true },
          (error, files) => {
            if (error) console.error(error.message);
            files.forEach((unit) => {
              fsPromises.copyFile(
                `${folder}/${file.name}/${unit.name}`,
                `${copyFolder}/${file.name}/${unit.name}`,
              );
            });
          },
        );
      } else {
        fsPromises.copyFile(
          `${folder}/${file.name}`,
          `${copyFolder}/${file.name}`,
        );
      }
    });
  });
})();
