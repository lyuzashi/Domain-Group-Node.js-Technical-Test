import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import HTML from './index';
import HCard from './app/hcard';

const app = express();

app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToStaticMarkup(
    <HTML>
      <HCard />
    </HTML>
  );
  res.write(content);
  res.end();
});

app.use(express.static(`static`));

export default app;
