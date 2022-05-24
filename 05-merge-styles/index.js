const fs = require('fs');
const path = require('path');
// const fsPromises = require('fs').promises;

async function mergeStyles() {
  const writerStream = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'bundle.css'),
  );
  for (let file of await fs.promises.readdir(path.join(__dirname, 'styles'), {
    withFileTypes: true,
  })) {
    if (!file.isDirectory()) {
      let unit = path.parse(file.name);
      if (unit.ext === '.css') {
        const readStream = fs.ReadStream(
          path.join(__dirname, 'styles', `${file.name}`),
        );
        readStream.on('data', async (chunk) => {
          writerStream.write(chunk);
        });
      }
    }
  }
}

try {
  (async () => {
    await mergeStyles();
  })();
} catch {
  console.log(error.message);
}
