const express = require('express');
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const app = express();

app.use(express.json());
app.use('/', express.static(__dirname + '/public'));

const options = { root: path.join(__dirname) };

const logger = (method, route, filename) => {
  return (err) => {
    if (err) {
      next(err);
    } else {
      console.log(`replied to ${method} on ${route} with ${filename}`);
    }
  };
}

app.get('/notes', (req, res) => {
  res.sendFile('/public/notes.html', options, logger('get', '/notes', '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile('/db/db.json', options, logger('get', req.path, '/db/db.json'));
});

app.post('/api/notes', (req, res) => {
  console.log(req.body);
  let id = new uuidv4();
  console.log(`Created uuidv4: ${id}`);
});

app.delete('/api/notes/:id', (req, res) => {
});

app.get('')

app.get('*', (req, res) => {
  res.sendFile('/public/index.html', options, logger('get', req.path, '/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
