const dir = require('node-dir');
const db = require('./models');
const insertData = require('./services/insert-data.js');

db.sequelize.sync();

const options = {
  match: /\.rdf$/, // Match file names that in '.rdf',
  exclude: ['pg0.rdf'], // Ingonre the template RDF file (ID = 0)
};

dir.readFiles(__dirname, options, insertData);
