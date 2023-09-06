import React , {useState ,useContext, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import TokenContext from '../context/TokenContext';
import axios from 'axios';
import "./auth.css";
import image from "./Navbar/Image/instaText.png";
import image3 from "./Navbar/Image/image3.jpg"
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [user , setUser] = useState({
        loginEmail : '',
        loginPassword : ''
    })
    const [error , setError] = useState(null);
    const [success , setSuccess] = useState(null);

    let navigate = useNavigate();
    let {loginEmail , loginPassword} = user;
    let {token , setToken} = useContext(TokenContext);
    
    useEffect(() => {
        if(token) {
            navigate('/dashboard');
        }
    }, [token])
    const handleLogin = (e) =>{
        e.preventDefault();
        console.log(user);
        if(!loginEmail.trim() || !loginPassword.trim()) {
            setError('Please fill all the fields');
            setSuccess("");  
        }

        axios.post("https://instagram-express-app.vercel.app/api/auth/login" , 
        {
            email:loginEmail,
            password:loginPassword
        })
        .then(res =>{
            console.log(res);
            setError("");
            setSuccess(res.data.data.message)
        })
        .catch(err=>{
            console.log(err);
            setError(err.response.data.message);
           setTimeout(() => {
            navigate('/');
           }, 1000);
            
        })


    }
  return (
    <>
    <div className='mainLoginPage'>
    <div className='loginContainer'>
    <div className='image1Div'>
        <img src={image3} /> 
   </div>
    <div className='login'>
        <div className='imageDiv'><img src={image} /></div>
        <div className='inputDiv'>
        <input type="email" placeholder='Email address' value={loginEmail} onChange={(e)=>setUser({...user , loginEmail:e.target.value})} /><br/>
        <input type="password" placeholder='Password' value={loginPassword} onChange={(e)=>setUser({...user , loginPassword:e.target.value})} /><br />
        </div>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
        <button className='logInBtn' onClick={handleLogin} >Login</button>
        <p className='or'>OR</p>
        <p>Don't have an account? <NavLink to="/">Sign Up</NavLink> </p>
    </div>
    </div>
    </div>
    </>
  )
}

export default Login