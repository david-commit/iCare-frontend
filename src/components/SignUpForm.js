import React, { useState } from 'react';

function SignUpForm({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [condition, setCondition] = useState('');
  const [caregiver, setCaregiver] = useState('');
  // const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // setErrors([]);
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
        caregiver,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        //  GET FROM DOWN
      }
    });
  }

  // } else {
  // r.json().then((err) => setErrors(err.errors));
  return (
    <div className='signup'>
      <h1>Signup</h1>
      <form id='signup-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
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
        <input
          type='text'
          id='caregiver'
          value={caregiver}
          onChange={(e) => setCaregiver(e.target.value)}
        />
        <button type='submit'>{isLoading ? 'Loading...' : 'Sign Up'}</button>
        {/* {errors.map((err) => (
        <Error key={err}>{err}</Error>
      ))} */}
      </form>
      <div className='already'>
        <hr />
        <p>
          Already have an account? &nbsp;
          {/* <button color='secondary' onClick={() => setShowLogin(true)}>
          Log In
        </button> */}
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
