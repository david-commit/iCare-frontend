import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        // r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <form id='login-form' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          autoComplete='off'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        {/* {errors.map((err) => (
        <Error key={err}>{err}</Error>
      ))} */}
      </form>
      <div className='already'>
        <hr />
        <p>
          Don't have an account? &nbsp;
          {/* <button color='secondary' onClick={() => setShowLogin(true)}>
          Sign Up
        </button> */}
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
