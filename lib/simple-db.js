const { readFile, writeFile } = require('fs');
const path = require('path');
// const shortid = require('shortid');


class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
    return writeFile(this.newFolder, this.dirPath);
  }
  get(id){
    const idFile = `${id}.txt`;
    this.file = path.join(this.dirPath, idFile); 

    const parseFile = readFile(this.file, 'utf-8')
      .then((file) => JSON.parse(file));



    return parseFile.catch((error) => {
      if(error.code === 'ENOENT'){
        return null;
      }
      throw error;
    });
  }

}

module.exports = SimpleDb;
