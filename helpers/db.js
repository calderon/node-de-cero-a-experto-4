const fs = require('fs');

const file = './db/data.json';

const save = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const read = () => {
  let data = [];

  if (!fs.existsSync(file)) {
    return data;
  }

  const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });

  if (fileContent.length > 0) {
    data = JSON.parse(fileContent);
  }

  return data;
}

module.exports = {
  save,
  read
};
