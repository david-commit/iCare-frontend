import React, { useState, useEffect } from 'react'

function PatientMe({ user }) {
  const [allPractitioners, setAllPractitioners] = useState([])
  const [duration, setDuration] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [errors, setErrors] = useState([])
  const [practitioner, setPractitioner] = useState("")

  useEffect(() => {
    fetch("/practitioners")
    .then(response => response.json())
    .then(data => setAllPractitioners(data))
  }, [])

   function handleBookingSubmit() {
    //  e.preventDefault();
     setErrors([]);
     fetch('/appointments', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         patient_id: user.id,
         duration,
         appointment_type: appointmentType,
         practitioner_id: practitioner
       }),
     }).catch((err) => setErrors(err.errors));
   }

  return (
    <div className='patient-me'>
      <div className='patient-me-table'>
        <h1>Hi {user.name},</h1>
        <p>See your booked apointments below</p>
        <br />
        <br />
        <table>
          <tr>
            <th>App ID</th>
            <th>Practioner ID</th>
            <th>Practitioner Name</th>
            <th>Duartion</th>
            <th>Type</th>
            <th>Booked At</th>
            <th></th>
          </tr>
          {user.appointments.length < 1 ? (
            <tr>
              <td colSpan='7'>No Booked Sessions</td>
            </tr>
          ) : (
            user.appointments.map((app) => (
              <tr>
                <td>{app.id}</td>
                <td>{app.practitioner_id}</td>
                <td>{app.practitioner_name}</td>
                <td>{app.duration}</td>
                <td>{app.appointment_type}</td>
                <td>{app.booked_at}</td>
                <td>
                  <i
                    onClick={fetch(`/appointments/${app.id}`, {
                      method: 'DELETE',
                    })
                    .then(r => r.json())
                  }
                    class='fa-solid fa-trash'
                  ></i>
                </td>
              </tr>
            ))
          )}
        </table>
      </div>

      <div className='patient-me-form'>
        <h1>Book an Appointment</h1>
        <form id='appointment-form' onSubmit={handleBookingSubmit}>
          <label htmlFor='practitioner'>Select Practitioner</label>
          <select
            name='practitioner'
            onChange={(e) => setPractitioner(e.target.value)}
          >
            <option className='option' hidden>
              Select Practitioner
            </option>
            {allPractitioners.map((prac) => {
              return (
                <option value={prac.id} key={prac.id} className='option'>
                  {prac.name}
                </option>
              );
            })}
          </select>
          <label htmlFor='duration'>Duration</label>
          <input
            type='text'
            placeholder='e.g 1 hour'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <label htmlFor='appointmentType'>Type of Appointment</label>
          <input
            type='text'
            placeholder='e.g Consultation'
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
          />
          <button type='submit'>BOOK</button>
          {errors.map((err) => (
            <li style={{ color: 'red' }} key={err}>
              {err}
            </li>
          ))}
        </form>
      </div>
    </div>
  );
}

export default PatientMe