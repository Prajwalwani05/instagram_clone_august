import React , {useState ,useContext, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import TokenContext from '../context/TokenContext';
import axios from 'axios';

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
    <div>
        <h1>Login</h1>
        <input type="email" placeholder='Email' value={loginEmail} onChange={(e)=>setUser({...user , loginEmail:e.target.value})} />
        <input type="password" placeholder='Password' value={loginPassword} onChange={(e)=>setUser({...user , loginPassword:e.target.value})} />
        <button onClick={handleLogin} >Login</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
    </div>
  )
}

export default Login