const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/keys');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const db = config.mongoURI;

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(logger('dev'));
app.set('jwt-secret', config.secret);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(db,{ useNewUrlParser: true })
  .then(()=>console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/', indexRouter);
app.use('/api/auth', usersRouter);

module.exports = app;
