const { sequelize, dataTypes, checkModelName, checkPropertyExists } = require('sequelize-test-helpers');

const BookModel = require('./book.model.js');

describe('src/models/Simple', () => {
  const Model = BookModel(sequelize, dataTypes);
  const instance = new Model();
  checkModelName(Model)('Book');
  context('properties', () => {
    ['id', 'authors', 'title', 'publisher', 'subjects', 'publicationDate'].forEach(checkPropertyExists(instance));
  });
});
