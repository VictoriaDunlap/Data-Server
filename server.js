const express = require('express')
const data = require('./db/data.json')
const path = require('path')
const { readFromFile, readAndAppend } = require('./helpers/fsUtils')
const uuid = require('./helpers/uuid')

const PORT = 5511
const app = express()

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Root directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

router.get('/', (req, res) => {
    console.info(`${req.method} request received for tips`)
    readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)))
})

// app.post('/', (req, res) => {
//     res.json(`${req.method} request
//     received`)
// })

// app.put('/', (req, res) => {
//     res.json(`${req.method} request
//     received`)
// })

// app.delete('/', (req, res) => {
//      res.send('DELETE request to homepage')
// })

// app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`);
// })