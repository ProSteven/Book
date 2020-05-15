const db = require('../models');
const parseRDF = require('./parse-rdf.js');

const { Book } = db;

module.exports = (err, content, next) => {
  if (err) throw err;
  const book = parseRDF(content);
  Book.create({
    id: book.id,
    title: book.title,
    authors: JSON.stringify(book.authors),
    publisher: 'Gutenberg',
    publicationDate: new Date(book.issued),
    subjects: JSON.stringify(book.subjects),
    language: book.language,
    licenseRights: book.rights,
  });
  next();
};
