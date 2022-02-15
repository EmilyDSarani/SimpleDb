//deconstructing fs
const { readFile, writeFile, readdir } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');


class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }
  async get(id){
    try{
      const idFile = `${id}.json`;
      const file = path.join(this.dirPath, idFile); 
      const parsed = await readFile(file, 'utf-8');
      return JSON.parse(parsed);
    } catch(error){
      if(error.code === 'ENOENT'){
        return null;
      }
      throw error;
    }
  }
  save(object){
    const id = shortid.generate();
    object.id = id;
    const file = `${id}.json`;
    const folder = path.join(this.dirPath, file);
    const stringyObj = JSON.stringify(object);
    return writeFile(folder, stringyObj);
  }
  
  async getAll(){
    const allFiles = await readdir(this.dirPath); 
    return Promise.all(allFiles.map((file) => this.get(file.split('.')[0])))
    ;
  }


}

module.exports = SimpleDb;
