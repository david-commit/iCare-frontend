import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

function SignUp({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [condition, setCondition] = useState('');
  const [caregiver, setCaregiver] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allCaregivers, setAllCaregivers] = useState([]);
  const [success, setSuccess] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        password_confirmation: passwordConfirmation,
        condition,
        caregiver_id: caregiver,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          setSuccess(user);
          
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  useEffect(() => {
    fetch('/caregivers')
      .then((response) => response.json())
      .then((data) => setAllCaregivers(data));
  }, []);

  if (success == !null) return <NavLink to='/me' />;

  return (
    <div className='signup'>
      <h1>Signup</h1>
      <form id='signup-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Username</label>
        <input
          type='text'
          id='name'
          autoComplete='off'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
        <label htmlFor='password'>Password Confirmation</label>
        <input
          type='password'
          id='password_confirmation'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete='current-password'
        />
        <label htmlFor='condition'>Patient's Condition</label>
        <textarea
          placeholder="Provide information about patient's condtion.."
          rows='3'
          id='bio'
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
        <label htmlFor='caregiver'>Caregiver</label>
        {/* ==SELECT== */}
        <select
          name='caregiver'
          // value={caregiver}
          onChange={(e) => setCaregiver(e.target.value)}
        >
          <option className='option' hidden>
            Select Caregiver
          </option>
          {allCaregivers.map((carer) => {
            return (
              <option className='option' key={carer.id} value={carer.id}>
                {carer.name}
              </option>
            );
          })}
        </select>
        {/* ==SELECT== */}
        <button type='submit'>{isLoading ? 'Loading...' : 'Sign Up'}</button>
        {errors.map((err) => (
          <li style={{ color: 'red' }} key={err}>
            {err}
          </li>
        ))}
      </form>
      <div className='already'>
        <hr />
        <p>
          Already have an account? &nbsp;
          <Link to='/login'>
            <button type='button'>Login</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
