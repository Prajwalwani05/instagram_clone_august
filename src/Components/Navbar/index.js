// import React , {useState} from 'react';
import image from './Image/instaText.png';
import "./Navbar.css";
import { NavLink  } from 'react-router-dom';

const index = () => {
// const [searchBox , setSearchBox] = useState("");


const searchInput = ()=>{
  // setSearchBox();
}

  return (
    <div className='navbar'>
      <img src={image} alt='img' /><br />
      <NavLink to="/dashboard" activeClassName="a"><span class="material-symbols-outlined">home</span>Home</NavLink>
      <NavLink to="/dashboard" activeClassName="a"><span class="material-symbols-outlined">search</span>Search</NavLink>
      <NavLink to="/create" activeClassName="a"><span class="material-symbols-outlined">add_circle</span>Create</NavLink>
      <NavLink to="/profile" activeClassName="a"><span class="material-symbols-outlined">account_circle</span>Profile</NavLink>
      {/* <NavLink><span class="material-symbols-outlined">play_arrow</span>Reels</NavLink>
      <NavLink><span class="material-symbols-outlined">mms</span>Feed</NavLink>
      <NavLink><span class="material-symbols-outlined">settings</span>Settings</NavLink> */}

    </div>
  )
}

export default index;