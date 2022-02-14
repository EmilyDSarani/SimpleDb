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

  //Get id will need to
  //Write a test of get that checks for ENOENT in the implementation, bit converts it to a Not found error (see the copy file demo)

  it ('should get the id', async () => {
    const dataBase = new SimpleDb(TEST_DIR);
    const object = { text: 'hakuna matata' };
    await dataBase;
    const file = await dataBase.get(object.id);
    return expect(file).toEqual(object);

  });

});
