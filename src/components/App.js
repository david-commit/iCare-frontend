import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Home from './Home';
import PatientMe from './PatientMe';

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // auto-login
  //   fetch('/me')
  //   .then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Switch>
        <Route exact path='/signup'>
          {user ? <PatientMe user={user} /> : <SignUpForm onLogin={setUser} />}
        </Route>
        <Route exact path='/login'>
          {user ? <PatientMe user={user} /> : <LoginForm onLogin={setUser} />}
        </Route>
        <Route exact path='/me'>
          {user ? <PatientMe user={user} /> : <LoginForm onLogin={setUser} />}
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
