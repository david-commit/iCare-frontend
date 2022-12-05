import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

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

      <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
        <Switch>
          <Route path='/signup'>
            <SignUpForm />
          </Route>
          <Route path='/login'>
            <LoginForm />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* =========== */}
      {/* <NavBar user={user} setUser={setUser} />
        {user ? (
          <Switch>
            <Route path="/">
              <Home user={user}/>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup">
              <SignUp setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        )} */}
      {/* =========== */}
    </>
  );
}

export default App;
