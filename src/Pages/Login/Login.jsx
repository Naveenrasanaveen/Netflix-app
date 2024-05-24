import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signstate,setsign] = useState('Sign In')


  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  
  const [password,setpassword]=useState('')

  const[loading,setloading] =useState(false)
  
 const user_auth=async(event)=>{

  event.preventDefault()
  setloading(true)
  if(signstate==="Sign In"){

    await login(email,password)
  }
  else{
    await signup(name,email,password)
  }
  setloading(false)
 }


  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        <h1>{signstate}</h1>
        <form >
          {
            signstate==='Sign Up'?<input type="text" placeholder='Your Name' value={name}  onChange={(e)=>{setname(e.target.value)}}/>:<></>
          }
          <input type="email" placeholder='Your Email' value={email}  onChange={(e)=>{setemail(e.target.value)}} />
          <input type="password" placeholder='Password'value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
          <button onClick={user_auth} type='submit'>Sign Up</button>
          <div className="form-help">
            <div className="remember">
               <input type="checkbox" />
               <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {
            signstate==='Sign In'?<p>New to Netflix? <span onClick={()=>setsign('Sign Up')}>Sign   Up Now</span></p>:<p>Already have account? <span onClick={()=>setsign('Sign In')}>Sign In Now</span></p>
          }
          
         
        </div>
      </div>
    </div>
  )
}

export default Login