//deconstructing fs
const { readFile, writeFile, readdir } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');


class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }
  get(id){
    const idFile = `${id}.json`;
    const file = path.join(this.dirPath, idFile); 

    return readFile(file, 'utf-8')
      .then((file) => JSON.parse(file))
      .catch((error) => {
        if(error.code === 'ENOENT'){
          return null;
        }
        throw error;
      });
  }
  save(object){
    const id = shortid.generate();
    object.id = id;
    const file = `${id}.json`;
    const folder = path.join(this.dirPath, file);
    const stringyObj = JSON.stringify(object);
    return writeFile(folder, stringyObj);
  }
  
  getAll(){
    return readdir(this.dirPath).then((allFiles) =>
      Promise.all(allFiles.map((file) => this.get(file.split('.')[0])))
    );
  }


}

module.exports = SimpleDb;
