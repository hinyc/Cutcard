const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes');
const fs = require('fs');
const https = require('https');

const app = express();
const port = 80;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', indexRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
