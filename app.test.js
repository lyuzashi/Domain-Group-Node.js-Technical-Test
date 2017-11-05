import app from './app.js';
import request from 'supertest';
import mockFS from 'mock-fs';

beforeAll(() => {
  mockFS({
    'static/test.css': `body {}`,
  })
});

afterAll(() => {
  mockFS.restore();
});

describe(`Serves up the SPA`, () => {
  test(`It responds to GET /`, done => {
    request(app).get(`/`)
      .expect(200)
      .end(done);
  });
  test(`It serves static assets`, done => {
    request(app)
      .get('/test.css')
      .expect(200, `body {}`)
      .end(done);
  })
});


// Saves completed form data on user submission
// - Method of insert in DB works (full update)
// - Handles POST /submit (inserts to db)
// On page reload, populates the form fields with the values previous saved
// - Injects data for inflating with magic string (based on cookie)
// Is stateless, to support auto-scaling
// – spin up multiple app instances to check data

