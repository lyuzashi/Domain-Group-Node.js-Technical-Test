import request from 'supertest';
import render from './render';
import app from '../app.js';
import { save, find } from './db';

jest.mock('./db');

describe(`On page reload, populates the form fields with the values previous saved`, () => {
  test(`User is found in DB from session`, done => {
    const id = `TEST02`;
    request(app)
    .get(`/`)
    .set(`Cookie`, [`user=${id}`])
    .then(response => {
      expect(find).toHaveBeenCalledWith(id);
      done();
    });
  });
  test(`Found user is loaded into HCard component`, done => {
    const id = `TEST02`;
    const data = { givenName: `Magic name string` };
    save(id, data).then(() => {
      request(app)
      .get(`/`)
      .set(`Cookie`, [`user=${id}`])
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(`Magic name string`);
        done();
      });
    })
  });
})