import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import request from 'supertest';
import { shallow } from 'enzyme';
import app from './app.js';
import HTML from './index';

jest.mock('./app/hcard');

Enzyme.configure({ adapter: new Adapter() });

describe(`Server renders the SPA to support non-JS clients`, () => {
  test(`HTML document renders`, () => {
    const wrapper = shallow(<HTML />);
    expect(wrapper.find('html')).toBeDefined();
  });
  test(`HTML document to have React mount point`, () => {
    const wrapper = shallow(<HTML />);
    expect(wrapper.find('#app')).toBeDefined();
  });
  test(`HTML document renders children`, () => {
    const wrapper = shallow(<HTML><div id="document-renders-children" /></HTML>);
    expect(wrapper.contains(<div id="document-renders-children" />)).toBeTruthy();
  });
  test(`hCard is rendered on GET /`, done => {
    request(app).get(`/`).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toMatch(`Magic hCard string`);
      done();
    });
  });
});
