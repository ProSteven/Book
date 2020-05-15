const fs = require('fs');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const rdf = fs.readFileSync(`${__dirname.slice(0, __dirname.length - 9)}/cache/epub/8/pg8.rdf`);
const { makeMockModels } = require('sequelize-test-helpers');

chai.use(sinonChai);

describe('insert-data', () => {
  const Book = { create: sinon.stub() };
  const mockModels = makeMockModels({ Book });
  const insertData = proxyquire('./insert-data', {
    '../models': mockModels,
  });

  it('should be a function', () => {
    expect(insertData).to.be.a('function');
  });

  it('should be a same', () => {
    insertData(false, rdf, () => {});
    expect(Book.create).to.have.been.calledWith(
      sinon.match({
        authors: '["Lincoln, Abraham"]',
        id: '8',
        language: 'en',
        licenseRights: 'Public domain in the USA.',
        publicationDate: new Date('1978-12-01'),
        publisher: 'Gutenberg',
        subjects: '["United States -- Politics and government -- 1861-1865","Presidents -- United States -- Inaugural addresses"]',
        title: "Abraham Lincoln's Second Inaugural Address",
      })
    );
  });

  it('should be called', () => {
    const spy = sinon.spy();
    insertData(false, rdf, spy);
    sinon.assert.calledOnce(spy);
  });
});
