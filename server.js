const express = require('express')
const data = require('./db/appts.json')
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

// GET routing to main page 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// GET routing to access the doctor.json db
app.get('/api/doctors', (req, res) => {
    console.info(`${req.method} request received for doctors`)
    readFromFile('./db/doctor.json')
    .then((data) => res.json(JSON.parse(data)))
})

// GET route for rendering doctor availability list 
app.get('/api/appts', (req, res) => {
    console.info(`${req.method} request received to view appointments`)
    
    // destructuring 
    const { firstname, lastname, appointment, kind } = req.body
    // if appt request has these params, show corresponding doc and availability
    if (req.body) {
      const upcomingAppts = {
        firstname,
        lastname,
        appointment,
        kind,
      }
    
      readFromFile(upcomingAppts, './db/appts.json')
      res.json(`Appointments display`)
    } else {
      res.error('Error in viewing appointments')
    }
})

app.delete('/', (req, res) => {
     res.send('DELETE request to homepage')
})

app.listen(PORT, () => {
    console.log(`Test app listening at http://localhost:${PORT}`);
})