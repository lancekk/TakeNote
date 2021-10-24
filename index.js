const express = require('express');
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');
const app = express();

const options = { root: path.join(__dirname) };

const logger = (method, route, filename) => {
  (err) => {
    if (err) {
      next(err);
    } else {
      console.log(`replied to ${method} on ${route} with ${filename}`);
    }
  }
}

app.get('/notes', (req, res) => {
  res.sendFile('/public/notes.html', options, logger('get', '/notes', '/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile('/public/index.html', options, logger('get', req.path, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json').then(f => f.json()).then(json => {
    res.json(json);
  }).catch(logger('get', req.path, '/db/db.json'));
});

app.post('/api/notes', (req, res) => {
});

app.delete('/api/notes/:id', (req, res) => {
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
