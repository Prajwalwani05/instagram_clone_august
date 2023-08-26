import React from 'react';
import './App.css';
import Signup from './Components/Signup';
import {Routes , Route} from 'react-router-dom'
import DashBoard from './Components/DashBoard';
import Login from './Components/Login';


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/'  element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<DashBoard />} />
     </Routes>
      
    </div>
  );
}

export default App;
