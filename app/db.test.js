import request from 'supertest';
import app from '../app.js';
import { update, save, find } from './db';

jest.mock('./db');

describe(`Saves user inputed data to the server as they switch between form fields`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test(`Updates data in database`, done => {
    const id = `TEST01`;
    save(id, { givenName: `Sam` })
    .then(() => (update(id, { surname: `Fairfax` })))
    .then(model => {
      expect(model).toMatchObject({
        givenName: `Sam`,
        surname: `Fairfax`,
      });
      done();
    })
  })
  test(`Calls update on POST /update `, done => {
    request(app)
    .post(`/update`)
    .send('suburb=Pyrmont')
    .then(response => {
      expect(update).toHaveBeenCalledWith(undefined, {suburb: `Pyrmont`});
      done();
    })
  });
  test(`Provides cookie to user`, done => {
    request(app)
    .post(`/update`)
    .then(response => {
      expect(response.header['set-cookie']).toContain(`user=XYZ; Path=/`);
      done();
    })
  });
  test(`Stores data sent from client`, done => {
    request(app)
    .post(`/update`)
    .send(`suburb=Pyrmont`)
    .then(response => {
      expect(find(`XYZ`)).resolves.toMatchObject({
        suburb: `Pyrmont`,
      });
      done();
    })
  });
});

describe(`Saves completed form data on user submission`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test(`Saves to database`, done => {
    save(`ABC`, { country: `Australia` }).then(({id}) => {
      expect(find(id)).resolves.toMatchObject({
        country: `Australia`
      });
      done();
    }) 
  });
  test(`Calls save on POST /submit `, done => {
    request(app)
    .post(`/submit`)
    .send(`givenName=Sam&surname=Fairfax&email=sam.fairfax%40fairfaxmedia.com.au&phone=0292822833&houseNumber=100&street=Harris+Street&suburb=Pyrmont&state=NSW&postcode=2009&country=Australia`)
    .then(response => {
      expect(save).toHaveBeenCalledWith(undefined, {
        givenName: `Sam`,
        surname: `Fairfax`,
        email: `sam.fairfax@fairfaxmedia.com.au`,
        phone: `0292822833`,
        houseNumber: `100`,
        street: `Harris Street`,
        suburb: `Pyrmont`,
        state: `NSW`,
        postcode: `2009`,
        country: `Australia`
      });
      done();
    })
  });
  test(`Stores data sent from client`, done => {
    request(app)
    .post(`/submit`)
    .send(`street=Harris Street`)
    .then(response => {
      expect(find(`XYZ`)).resolves.toMatchObject({
        street: `Harris Street`,
      });
      done();
    })
  });
  test(`Redirects back to / after submit`, done => {
    request(app)
    .post(`/submit`)
    .expect(302)
    .expect('location', '/')
    .end(done);
  });
});
