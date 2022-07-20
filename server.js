const express = require('express')
const apptData = require('./db/appts.json')
const docData = require('./db/doctor.json')
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
    readFromFile(docData)
    .then((data) => res.json(JSON.parse(data)))
})

// GET route for rendering doctor appointments list 
app.get('/api/appts', (req, res) => {
    // sanity check
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
    
      readFromFile(upcomingAppts, apptData)
      res.json(`Appointments display`)
    } else {
      res.error('Error in viewing appointments')
    }
})

// DELETE route for appts
app.delete('/api/delete.appts', (req, res) => {
    // sanity check
    console.info(`${req.method} request received to view appointments`)

    const { firstname, lastname, appointment, kind } = req.body
    
    if (req.body) {
      const upcomingAppts = {
        firstname,
        lastname,
        appointment,
        kind,
      }
    
      readFromFile(upcomingAppts, apptData)
      res.json(`Delete successful`)
    } else {
      res.error('Error in deleting appointment')
    }
})

// POST routing to add new appts
app.post('/api/appts', (req, res) => {
    // sanity check
    console.info(`${req.method} request received to add an appointment`)
  
    const { firstname, lastname, appointment, kind } = req.body
  
    if (req.body) {
      const newAppt = {
        firstname,
        lastname,
        appointment,
        kind,
        id: uuid(),
      };
  
      readAndAppend(newAppt, apptData);
      res.json(`Appointment added successfully 🚀`);
    } else {
      res.error('Error in adding appointment');
    }
});

app.listen(PORT, () => {
    console.log(`Test app listening at http://localhost:${PORT}`);
})