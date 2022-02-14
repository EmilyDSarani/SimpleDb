const { readFile } = require('fs');
const fs = require('fs/promises');
const path = require('path');

//First we will need to save an obj
//To do this

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }
  get(id){
    const idFile = `${id}.json`;
    this.file = path.join(this.dirPath, idFile); 
    const parseFile = readFile(this.file, 'utf8')
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
