import React from 'react';
import './App.css';
import { Sidebar, Canvas } from './components';


const App = () => {

  return (
    <div className='App'>
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default App;
