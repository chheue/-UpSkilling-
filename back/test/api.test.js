const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { describe, it } = mocha;
const { expect } = chai;

chai.use(chaiHttp);
const URL = 'http://localhost:8080';

describe('Request wrong URL requests', () => {
  it('should test wrong GET request and get 404', (done) => {
    chai.request(`${URL}`)
      .get('/test')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should test wrong POST request and get 404', (done) => {
    chai.request(`${URL}`)
      .post('/test')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
