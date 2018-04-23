const express = require('express');
const mongoose = require('mongoose');
const app = express();

const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('mongodb connected...fireworks'))
  .catch(err => console.log('oh no! no fireworks...', err));

// basic route for now
app.get('/', (req, res) => res.send('Hello everyone'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on ${port}`));
