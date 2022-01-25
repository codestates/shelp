require('dotenv').config();

const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 4000;

// Routes
const indexRouter = require('./routes');

// Middle-ware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use(session({
  secret: 'ras',
  resave: true,
  secure: false,
  saveUninitialized: false,
}));
<<<<<<< HEAD

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
=======
>>>>>>> 60b0a4a14246cf5898a8e7e2f5df5f25c0375c49

// router
app.use('/', indexRouter);

// test용
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
