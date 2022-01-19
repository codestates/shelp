const express = require("express");
const indexRouter = require('./router');
const cors = require('cors');
const app = express();
const port = 4000;

const mysql = require('mysql');
const dotenv = require('dotenv');
const config = require('./config/index.js');
dotenv.config();

const con = mysql.createConnection(
  config[process.env.NODE_ENV || 'development']
);

con.connect((err) => {
  if (err) throw err;
});

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.json({ text: 'HELLO' });
});
app.use('/', indexRouter);

// app.get("/", (req, res) => {
//   console.log('===point a===')
//   const queryString = `SELECT * FROM test`;

//   con.query(queryString, (error, result) => {
//     res.send(result);
//   });
// });

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
