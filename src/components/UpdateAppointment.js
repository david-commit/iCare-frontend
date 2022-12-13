import React, { useState, useEffect } from 'react'; // import { Tooltip } from 'react-tooltip';
import { NavLink } from 'react-router-dom';

function UpdateAppointment({ user }) {
  // DEPLOYED API LINK
  // const BASE_URL = 'https://icare-backend-production-a245.up.railway.app';
  // const BASE_URL = 'http://localhost:3000';

  const [allPractitioners, setAllPractitioners] = useState([]);
  const [duration, setDuration] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [errors, setErrors] = useState([]);
  const [practitioner, setPractitioner] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch(`/practitioners`)
      .then((response) => response.json())
      .then((data) => setAllPractitioners(data));
  }, []);

  function handleBookingUpdate(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`/appointments/:id`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: user.id,
        duration,
        appointment_type: appointmentType,
        practitioner_id: practitioner,
        date,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          <NavLink to={`/appointments`}></NavLink>;
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
    setDuration('');
    setAppointmentType('');
    setDate('');
    setPractitioner('');
  }

  return (
    <div className='patient-me'>
      <div className='patient-me-form'>
        <h1>Update Appointment</h1>
        <br />
        <form id='appointment-form' onSubmit={handleBookingUpdate}>
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
          <label htmlFor='duration'>Date</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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
          <button type='submit'>Submit Change</button>
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

export default UpdateAppointment;
