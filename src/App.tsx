import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthenticatedApp } from 'authenticated-app';
import { UnanthenticatedApp } from 'unauthenticated-app';
import {useAuth} from "context/auth-context"


function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp/>:<UnanthenticatedApp/>}
    </div>
  );
}

export default App;
