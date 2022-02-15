const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it ('should get the id', async () => {
    const dataBase = new SimpleDb(TEST_DIR);
    const object = { 
      id: '1',
      text: 'hakuna matata' 
    };
    const srcPath = path.join(TEST_DIR, `${object.id}.json`);
    await fs.writeFile(srcPath, JSON.stringify(object));
    return expect(await dataBase.get(object.id)).toEqual(object);

  });
  it ('should save the file', async () => {
    const dataBase = new SimpleDb(TEST_DIR);
    const object = { 
      id: '1',
      text: 'hakuna matata' 
    };
    return dataBase
      .save(object)
      .then(() => expect(object.id).toEqual(expect.any(String)));
  });

  it('should get all files',  () => {
    const db = new SimpleDb(TEST_DIR);
    const obj1 = { text: 'hakuna matata' };
    const obj2 = { text: 'be our guest' };

    const expectation = [{
      id: expect.any(String),
      text: expect.any(String),
    },
    {
      id: expect.any(String),
      text: expect.any(String),
    }
    ];


    return db
      .save(obj1)
      .then(() => db.save(obj2))
      .then(() => db.getAll())
      .then((files) => expect(files).toEqual(expectation));
  });
});
