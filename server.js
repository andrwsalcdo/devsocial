const express = require('express');

const app = express();

// basic route for now
app.get('/', (req, res) => res.send('Hello everyone'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on ${port}`));
