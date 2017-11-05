import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import render from './app/render';
import update from './app/update';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', render);
app.post('/update', update);
app.use(express.static(`static`));

export default app;
