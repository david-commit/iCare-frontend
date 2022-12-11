import React, { useState, useEffect } from 'react'; // import { Tooltip } from 'react-tooltip';

// DELETE NOT WORKING CORRECTLY

function UpdateAppointment({ user }) {
  const [allPractitioners, setAllPractitioners] = useState([]);
  const [duration, setDuration] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [errors, setErrors] = useState([]);
  const [practitioner, setPractitioner] = useState('');
  const [date, setDate] = useState('');
  // const allAppointments = user.appointments;
  // const allAppointmentsLength = allAppointments.length;

  useEffect(() => {
    fetch('/practitioners')
      .then((response) => response.json())
      .then((data) => setAllPractitioners(data));
  }, []);

  function handleBookingUpdate(e) {
    e.preventDefault();
    setErrors([]);
    fetch('/appointments', {
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
          'Success';
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
        <h1>Book an Appointment</h1>
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

// function handleLikeClick() {
//   const updateObj = {
//     likes: toy.likes + 1,
//   };

//   fetch(`/toys/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updateObj),
//   })
//     .then((r) => r.json())
//     .then((updatedToy) => onUpdateToy(updatedToy));
// }
