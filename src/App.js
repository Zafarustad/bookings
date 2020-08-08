import React from 'react';
import { GlobalProvider } from './context/GlobalState';
import Home from './Components/Home'
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Home />
    </GlobalProvider>
  );
}

export default App;
