require('dotenv').config();

const express = require("express");
const cookieParser = require('cookie-parser');
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

// router
app.use('/', indexRouter);

// test용
app.get('/', (req, res) => {
  res.send('HELLO');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
