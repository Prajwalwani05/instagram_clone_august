import React , {useState , useContext ,useEffect} from 'react';
import axios from 'axios';
import TokenContext from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  
  const [user , setUser] = useState({
    name:'' , email:'' , password:'' , cPassword:'' ,
  });
  const [error , setError] = useState(null);
  const [success , setSuccess] = useState(null);
  

  let {token , setToken} = useContext(TokenContext);
  let navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/dashboard')
    }
  },[])
  
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
    else if(password.length <= 8){
      setError('Password must be at least 8 characters');
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
    <div className='signup'>
      <h1>Signup</h1>
      <input type='text' placeholder='Name' onChange={(e)=>{setUser({...user , name:e.target.value})}} />
      <input type='email' placeholder='Email' onChange={(e)=>{setUser({...user , email:e.target.value})}}/>
      <input type='password' placeholder='Password' onChange={(e)=>{setUser({...user , password:e.target.value})}}/>
      <input type='password' placeholder='Confirm Password' onChange={(e)=>{setUser({...user , cPassword:e.target.value})}}/>
      <button onClick={handleSignup}>Signup</button>
      { error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  )
}

export default Signup