import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // DEPLOYED API LINK
  // const BASE_URL = 'https://icare-backend-production-a245.up.railway.app';
  // const BASE_URL = 'http://localhost:3000';

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          setSuccess(user);
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
          console.log(err);
        });
      }
    });
    setName('');
    setPassword('');
  }

  if (success === !null) return <NavLink to={'/me'} />;

  return (
    <div className='login'>
      <h1>Login</h1>
      <form id='login-form' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          autoComplete='off'
          placeholder='e.g Joe'
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

        <button type='submit'>{isLoading ? 'Loading...' : 'Login'}</button>

        {errors.map((err) => (
          <li key={err}>{err}</li>
        ))}
      </form>
      <div className='already'>
        <hr />
        <p>
          Don't have an account? &nbsp;
          <Link to={`/signup`}>
            <button type='button'>Sign Up</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
