const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const options = { root: path.join(__dirname) };

app.get('/notes', (req, res) => {
  res.sendFile('/public/notes.html', options);
});

app.get('*', (req, res) => {
  res.sendFile('/public/index.html', options);
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json').then(f => f.json()).then(json => {
    res.json(json);
  });
});

app.post('/api/notes', (req, res) => {
});

app.delete('/api/notes/:id', (req, res) => {
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
