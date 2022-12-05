import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Home from './Home';

function App() {
  const [user, setUser] = useState(null);
  console.log(user)
  useEffect(() => {
    // auto-login
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      {/* <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Switch>
          <Route path='/signup'>
            <SignUpForm />
          </Route>
          <Route path='/login'>
            <LoginForm />
          </Route>
        </Switch>
      </BrowserRouter> */}
      {/* =========== */}
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        {user ? (
          <Switch>
            <Route path='/'>
              <Home user={user} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/signup'>
              <SignUpForm setUser={setUser} />
            </Route>
            <Route exact path='/login'>
              <LoginForm setUser={setUser} />
            </Route>
            <Route exact path='/'>
              <Home />
            </Route>
          </Switch>
        )}
        {/* =========== */}
      </BrowserRouter>
    </>
  );
}

export default App;
