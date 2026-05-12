import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './style.css'
import { loginuser } from '../auth/api/authApi';

const LoginForm = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const handlesubmit= async(e)=>{
    e.preventDefault()
      try{
        const data = await loginuser({
        email,password
      })
      console.log(data)
      localStorage.setItem("token", data.token)
      navigate('/Homepage')
      }
      catch (err) {
    setError(
      err.response?.data?.message || "Email or Password is incorrect"
      )
    }
  }

  return (
    <form onSubmit={handlesubmit}  className='h-screen w-full flex items-center justify-center '>
      <div className='h-[680px] w-[500px] flex flex-col items-center   border-blue-200 rounded-4xl outline-none shadow-xl shadow-blue-200'>

        <h1 className='mb-40 py-12 text-3xl uppercase font-bold '>Login</h1>

      <input  className='text-gray-800 mb-10 outline-none bg-transparent text-2xl rounded border-gray-500 shadow-xl px-8 py-3 '
      type="text"
      value={email}
      placeholder='@gmail.com'
      onChange={(e)=> setEmail(e.target.value)}
       />
       <input  className='text-gray-800 outline-none bg-transparent text-2xl rounded border-gray-500 shadow-xl shadow= px-8 py-3 '
      type="password"
      value={password}
      placeholder='Password'
      onChange={(e)=> setPassword(e.target.value)}
       />
       {
        error && (
      <p className='text-red-500 mt-4 font-semibold'>
        {error}
      </p>
        )
       }
       
      
       <button className='mt-22 mb-5 bg-red-600 font-bold px-8 py-4 rounded-2xl uppercase text-white '>Login</button>
       <p >Create an account <Link className='text-blue-500 underline' to='/register'>Register</Link></p>
      </div>
    </form>
  )
}

export default LoginForm
