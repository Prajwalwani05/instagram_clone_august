import React , {useState, useContext} from 'react';
import './App.css';
import Signup from './Components/Signup';
import {Routes , Route} from 'react-router-dom'
import DashBoard from './Components/DashBoard';
import Login from './Components/Login';
import Create from "./Components/Create/Create";
import Profile from './Components/Profile/Profile';


function App() {
  const [imageList , setImageList] = useState([]);

  
  return (
    <div className="App">
     <Routes>
      <Route exact  path='/'  element={<Signup />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/dashboard' element={<DashBoard />} />
      <Route exact path='/create' element={<Create imageList={imageList} setImageList={setImageList} /> } />
      <Route exact path='/profile' element={<Profile imageList={imageList} />} />
     </Routes>
      
    </div>
  );
}

export default App;


