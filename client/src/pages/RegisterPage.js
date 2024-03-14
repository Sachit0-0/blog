import React from 'react'
import { useState } from 'react';

const RegisterPage = () => {
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');

 async function register(ev){
    ev.preventDefault();
    await fetch('http://localhost:4000',{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
    })
  }
  return (
    <form action="" className='' onSubmit={register}>
    <input type="text"
           placeholder="username"
           onChange={ev=>setUsername(ev.target.value)}
           
           
           />
    <input type="password"
           placeholder="password"
           value={password}
           onChange={ev=>setUsername(ev.target.value)}
           
           />
    <button>Register</button>
   </form>
  )
}

export default RegisterPage