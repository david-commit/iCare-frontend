import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Home from './Home';
import PatientMe from './PatientMe';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch('/patients/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return (
  //   <>
  //      <LoginForm onLogin={setUser} />
  //   </>
  // );

  // return (
  //   <>
  //     {/* {(user) ? (
  //       <BrowserRouter>
  //         <Navbar user={user} setUser={setUser} />

  //         <LoginForm onLogin={setUser} />
  //       </BrowserRouter>
  //     ) : ( */}
  //     <BrowserRouter>
  //       <Navbar user={user} setUser={setUser} />
  //       {user ? (
  //           <Switch>
  //             <Route exact path='/patients/me'>
  //               <PatientMe user={user} />
  //             </Route>
  //           </Switch>
  //         ) : (
  //       <Switch>
  //         <Route exact path='/signup'>
  //           <SignUpForm setUser={setUser} />
  //         </Route>
  //         <Route exact path='/login'>
  //           <LoginForm setUser={setUser} />
  //         </Route>
  //         <Route exact path='/'>
  //           <Home />
  //         </Route>
  //         {/* <Route exact path='/logout'>
  //               <Home />
  //             </Route> */}
  //       </Switch>
  //       )}
  //     </BrowserRouter>
  //     {/*  )} */}
  //   </>
  // );
  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Switch>
        <Suspense fallback={<Home />}>
          <Route exact path='/patients/me'>
            {user ? <PatientMe user={user} /> : <LoginForm setUser={setUser} />}
          </Route>

          <Route exact path='/signup'>
            {user ? (
              <PatientMe user={user} />
            ) : (
              <SignUpForm setUser={setUser} />
            )}
          </Route>
          <Route exact path='/login'>
            {user ? <PatientMe user={user} /> : <LoginForm setUser={setUser} />}
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
