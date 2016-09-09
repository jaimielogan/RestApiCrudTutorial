const app = require('../app.js');
const db = require('monk')('localhost/swords');
const Swords = db.get('swords');
const assert = require('assert');
const request = require('supertest');

//---------//
// Create //
//--------//
describe('POST api/swords', function () {

  before(function(done) {
    Swords.remove({}, function() {
      Swords.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
        done();
      });
    });
  });

  it('creates a new resource', function (done) {
    request(app)
      .post('/api/swords')
      .expect(201)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          done()
          // Check that the swords was created using a get
          .get('/api/swords/55c050595ae876b6b79ad318')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              throw err;
            } else {
              assert.equal(res.body.title, 'Master Sword');
              assert.equal(res.body._id, '55c050595ae876b6b79ad318');
              done();
            }
          });
          done();
        }
      });
  });
});

//---------//
// Update //
//--------//
describe('PUT api/swords/:id', function () {

  before(function(done) {
    Swords.remove({}, function() {
      Swords.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
        done();
      });
    });
  });

  it('updates a resource', function (done) {
    request(app)
      .put('/api/swords/55c050595ae876b6b79ad318')
      .send({title: 'from test'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title, 'from test');
          done();
        }
      });
  });
});

//---------//
// Read Individual //
//--------//

describe('GET api/swords/:id', function () {

  before(function(done) {
    Swords.remove({}, function() {
      Swords.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
        done();
      });
    });
  });

  it('finds a single resource', function (done) {
    request(app)
      .get('/api/swords/55c050595ae876b6b79ad318')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title, 'Master Sword');
          assert.equal(res.body._id, '55c050595ae876b6b79ad318');
          done();
        }
      });
  });
});


//---------//
// Delete //
//--------//
describe('DELETE api/swords/:id', function () {

  before(function(done) {
    Swords.remove({}, function() {
      Swords.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
        done();
      });
    });
  });

  it('deletes a single resource', function (done) {
    request(app)
      .delete('/api/swords/55c050595ae876b6b79ad318')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          done()
          // Do a .get to make sure that is gone
          .get('/api/swords/55c050595ae876b6b79ad318')
          .expect(404)
          .end(function(err,res) {
            if(err) {
              throw err;
            }
            else {
              done();
            }
          });
        }
      });
  });
});


//---------//
// Read All Items //
//--------//
describe('GET api/swords/', function () {

  before(function(done) {
    Swords.remove({}, function() {
      // Add in 2 swords
      Swords.insert([{title: 'Master Sword', _id: '55c050595ae876b6b79ad318'},{title: 'Sword 2', _id: '2'}], function() {
        done();
      });
    });
  });

  it('returns all resources', function (done) {
    request(app)
      .get('/api/swords')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body[0].title, 'Master Sword');
          assert.equal(res.body[0]._id, '55c050595ae876b6b79ad318');
          assert.equal(res.body[1].title, 'Sword 2');
          assert.equal(res.body[1]._id, '2');
          done();
        }
      });
  });
});
