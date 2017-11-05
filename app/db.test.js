import request from 'supertest';
import app from '../app.js';
import { update, save, find } from './db';

jest.mock('./db');

describe(`Saves user inputed data to the server as they switch between form fields`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test(`Saves to database`, () => {
    expect(save(undefined, { givenName: `Sam` })).resolves
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
    .send('suburb=Pyrmont')
    .then(response => {
      expect(find(`XYZ`)).resolves.toMatchObject({
        suburb: `Pyrmont`,
      });
      done();
    })
  });
});
