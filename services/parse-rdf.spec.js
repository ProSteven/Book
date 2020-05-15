const fs = require('fs');
const { expect } = require('chai');
const parseRDF = require('./parse-rdf.js');

const rdf = fs.readFileSync(`${__dirname.slice(0, __dirname.length - 9)}/cache/epub/5/pg5.rdf`);

describe('parseRDF', () => {
  it('should be a function', () => {
    expect(parseRDF).to.be.a('function');
  });
  it('should parse RDF content', () => {
    const book = parseRDF(rdf);
    expect(book).to.be.an('object');
    expect(book).to.have.a.property('id', '5');
    expect(book).to.have.a.property('title', 'The United States Constitution');
    expect(book).to.have.a.property('issued', '1975-12-01');
    expect(book).to.have.a.property('rights', 'Public domain in the USA.');
    expect(book).to.have.a.property('language', 'en');
    expect(book)
      .to.have.a.property('authors')
      .that.is.an('array')
      .with.lengthOf(1)
      .and.contain('United States');
    expect(book)
      .to.have.a.property('subjects')
      .that.is.an('array')
      .with.lengthOf(2)
      .and.contains('United States -- Politics and government -- 1783-1789 -- Sources')
      .and.contains('United States. Constitution');
  });
});
