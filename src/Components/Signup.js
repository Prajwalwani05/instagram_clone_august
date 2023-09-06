import React , {useState , useContext ,useEffect} from 'react';
import axios from 'axios';
import TokenContext from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import "./auth.css";
import image from "./Navbar/Image/instaText.png";
import image2 from "./Navbar/Image/image2.jpg"
import { NavLink } from 'react-router-dom';

const Signup = () => {

  
  const [user , setUser] = useState({
    name:'' , email:'' , password:'' , cPassword:'' ,
  });
  const [error , setError] = useState(null);
  const [success , setSuccess] = useState(null);
  

  let {token , setToken} = useContext(TokenContext);
  let navigate = useNavigate();

  const {name, email, password, cPassword} = user;

  const handleSignup = (e) =>{
    e.preventDefault();
    if(!name || !email || !password || !cPassword){
      setError('Please fill in all fields');
      setSuccess("");
      return;
    }
    else if(!name.trim().includes(" ")){
      setError("Please enter full name");
      setSuccess("");
      return;
    }
    else if(!email.includes('@')){
      alert('Please enter a valid email');
      setSuccess("");
      return;
    }
    else if(password.length < 6){
      setError('Password must be at least 6 characters');
      setSuccess("");
      return;
    }
    else if(password !== cPassword){
      setError('Passwords do not match');
      setSuccess("");
      return;
    }
    

      axios.post("https://instagram-express-app.vercel.app/api/auth/signup" , 
      {
        name,
        email,
        password
      })
      .then((res=>{
        console.log(res);
        setSuccess('Successfully')
        setError("");
        localStorage.setItem('user' , JSON.stringify(res.data.data));
        sessionStorage.setItem('token' , res.data.data.token);
        localStorage.setItem('token', res.data.data.token);
        setToken(res.data.data.token);
        setTimeout(() => {
          navigate('/Dashboard')
        }, 500);
      }))
      .catch((err=>{
        console.log(err);
        setError(err.response.data.message);
      } 
      ));
    
  }


  return (
    <>
    <div className='mainLoginPage'>
    <div className='loginContainer'>
    <div className='image2Div'>
        <img src={image2} /> 
   </div>
    <div className='signup'>
    <div className='imageDiv lessMargin'><img src={image} /></div>
      <div className='inputDiv lessMargin'>
      <input type='text' placeholder='Name' onChange={(e)=>{setUser({...user , name:e.target.value})}} /><br />
      <input type='email' placeholder='Email' onChange={(e)=>{setUser({...user , email:e.target.value})}}/><br />
      <input type='password' placeholder='Password' onChange={(e)=>{setUser({...user , password:e.target.value})}}/><br />
      <input type='password' placeholder='Confirm Password' onChange={(e)=>{setUser({...user , cPassword:e.target.value})}}/><br />
      </div>
      { error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}
      <button className='signupBtn lessMargin' onClick={handleSignup}>Signup</button>

      <p className='orSign lessMargin'>OR</p>
        <p>Already have an account? <NavLink to="/login">Log In</NavLink> </p>
    </div>
    </div>
    </div>
    </>
  )
}

export default Signup