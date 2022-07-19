<!-- automatically integrate >or combine< calendars from existing systems 

 >>> GET a list of doctors(doc/docs) 
        >>> (firstName, lastname) => {sort and return an array}
        >>> docs have unique ID/Firstname/Lastname

 >>> GET a list of appointments(appt/appts) FOREACH doctor and FOREACH day 
        >>> (doctor, date) => {FORLOOP through and return list}
        >>> appts have unique ID/PatientFirstname/PatientLastname/Date/Time/NewPatient OR Follow-up 
                >>> sounds like a switch case. would have to be able to read the old data and label it based on if the new user input matches the DB 

 >>> DELETE existing appts 
        >>> (doctor, date) => {FORLOOP through and return list and if selected, will be deleted}

 >>> POST new appts to calendar 
        >>> (date, time by 15 minute increments) => {FORLOOP through times to find available times that match the request and add to calendar}
        >>> a single doc can have 3 appts at the same time
                >>> IF doc appts > 3 at the specified time, THEN Throw err
 -->