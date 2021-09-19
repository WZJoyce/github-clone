import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthenticatedApp } from 'authenticated-app';
import { UnanthenticatedApp } from 'unauthenticated-app';
import {useAuth} from "context/auth-context"
import ErrorBoundary from 'components/ErrorBoundary';
import { FullPageErrorFallback } from 'components/lib';


function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      {user ? <AuthenticatedApp/>:<UnanthenticatedApp/>}
      </ErrorBoundary>

    </div>
  );
}

export default App;
