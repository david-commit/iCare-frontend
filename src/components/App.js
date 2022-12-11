// import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Appointment from './Appointment';
import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import SignUp from './SignUp';
import Footer from './Footer';
import UpdateAppointment from './UpdateAppointment';

// DEPLOYED LINK
// const BASE_URL = 'https://icare-backend-production-a245.up.railway.app';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route exact path='/me'>
          {user ? <Appointment user={user} /> : <Login onLogin={setUser} />}
        </Route>
        <Route exact path='/login'>
          {user ? <Appointment user={user} /> : <Login onLogin={setUser} />}
        </Route>
        <Route exact path='/signup'>
          {user ? <Appointment user={user} /> : <SignUp onLogin={setUser} />}
        </Route>
        <Route exact path='/appointments/:id'>
          <UpdateAppointment user={user} setUser={setUser}  />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
