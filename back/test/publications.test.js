const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const {
  describe, it,
} = mocha;
const { expect } = chai;

chai.use(chaiHttp);
const URL = 'http://localhost:8080';

describe('Request GET /publication', () => {
  it('should return an array of object', (done) => {
    chai.request(`${URL}`)
      .get('/publication')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        // eslint-disable-next-line no-unused-expressions
        expect(res.body).to.not.be.empty;
        res.body.forEach((element) => {
          expect(element).to.have.property('title');
          expect(element).to.have.property('content');
          expect(element).to.have.property('author');
          expect(element).to.have.property('creationDate');
          expect(element).to.have.property('publication_id');
        });
        done();
      });
  });
});

describe('Request POST/DELETE /publication', () => {
  it('should add publication and return 201', (done) => {
    chai.request(`${URL}`)
      .post('/publication')
      .send({
        publication_id: 999999, title: 'Test Article', author: 'Test Author', content: 'Test content',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('string');
        expect(res.body).to.be.equal('Publication ajoutée');
        done();
      });
  });

  it('should delete publication and return 204', (done) => {
    chai.request(`${URL}`)
      .delete('/publication/999999')
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});
