import React, { useState } from 'react';
import Header from './components/Header';
import './App.css'

function App() {
  
  const userName = localStorage.getItem('username');

  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
