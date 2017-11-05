import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HTML from './index';
import HCard from './hcard';

export default (req, res) => {
  const content = ReactDOMServer.renderToStaticMarkup(
    <HTML>
      <HCard />
    </HTML>
  );
  res.write(content);
  res.end();
}