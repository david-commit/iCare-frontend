import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Appointment({ user }) {
  const [allPractitioners, setAllPractitioners] = useState([]);
  const [duration, setDuration] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [errors, setErrors] = useState([]);
  const [practitioner, setPractitioner] = useState('');
  const [date, setDate] = useState('');
  const allAppointments = user.appointments;
  // const allAppointmentsLength = allAppointments.length

  // DEPLOYED API LINK
  const BASE_URL = 'https://icare-backend-production-a245.up.railway.app';

  const reload = () => window.location.reload();

  useEffect(() => {
    fetch(`${BASE_URL}/practitioners`)
      .then((response) => response.json())
      .then((data) => {
        setAllPractitioners(data);
        // reload();
      });
  }, []);

  function handleBookingSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
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
          console.log(err);
        });
      }
    });
    setDuration('');
    setAppointmentType('');
    setDate('');
    setPractitioner('');
    window.scrollTo(0, 0);
    reload();
  }

  return (
    <div className='patient-me'>
      <div className='patient-me-table'>
        <h1>Hi {user.name},</h1>
        <p>
          See your booked appointments below. Refresh page if no records appear
          or if frozen.
        </p>
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <th>App ID</th>
              <th>Practioner ID</th>
              <th>Practitioner Name</th>
              <th>App Type</th>
              <th>Date</th>
              <th>Duartion</th>
              <th colSpan={2}></th>
            </tr>
            {/* ==FAILS DUE TO TIMEOUT, USE ASYNC/AWAIT == */}
            {/* {allAppointmentsLength < 1 ? (
              <tr>
                <td colSpan='7'>No Booked Sessions</td>
              </tr>
            ) : ( */}
            {allAppointments?.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.practitioner_id}</td>
                <td>{app.practitioner_name}</td>
                <td>{app.appointment_type}</td>
                <td>{app.date}</td>
                <td>{app.duration}</td>
                <td>
                  <Link to={`/appointments/${app.id}`}>
                    <i id='edit-btn' class='fa-solid fa-pen-to-square'></i>
                  </Link>
                </td>
                <td>
                  <i
                    data-tip
                    data-for='del'
                    id='del-btn'
                    onClick={() => {
                      fetch(`/appointments/${app.id}`, {
                        method: 'DELETE',
                      });
                      reload();
                    }}
                    class='fa-solid fa-trash'
                  ></i>
                </td>
              </tr>
            ))}
            {/* )} */}
          </tbody>
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

export default Appointment;
