const express = require('express')
const data = require('./db/data.json')
const path = require('path');

const PORT = 5511;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.post('/', (req, res) => {
    res.json(`${req.method} request
    received`)
})

app.put('/', (req, res) => {
    res.json(`${req.method} request
    received`)
})

app.delete('/', (req, res) => {
     res.send('DELETE request to homepage')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
})