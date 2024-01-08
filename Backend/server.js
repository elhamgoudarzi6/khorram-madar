import express from 'express';
import mongoose from 'mongoose';
const app = express();
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import { port } from './config.js';
import helmet from 'helmet';
import expressValidator from 'express-validator';
import Router from './modules/routes/index.js';
mongoose.Promise = global.Promise;
import errhandler from './modules/routes/errorHandler.js';

//connect('mongodb://127.0.0.1:27017/lawyerDB');
mongoose.connect('mongodb://drjaferi_khorram:12345678@localhost:27017/drjaferi_khorram');

import { body, validationResult} from 'express-validator';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.json());
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));
app.use(helmet.frameguard({ action: "deny" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization,Accept");
  next();
});

app.options("/*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/public', express.static('public'));

app.use('/', Router);
app.use(errhandler);
app.listen(port, () => {
  console.log(`Server running at Port ${port}`)
});
