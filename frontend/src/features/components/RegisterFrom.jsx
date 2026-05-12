import React, { useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import { registeruser } from '../auth/api/authApi'

const RegisterFrom = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handlesumbit = async (e)=>{
    e.preventDefault()

  try{

    const data = await registeruser({
    email,password,name
    })
    console.log(data)
    localStorage.setItem("token", data.token)
    navigate('/login')
    setEmail("")
    setName("")
    setPassword("")

  }
  catch(err){
    console.log(err)
  }
  

  }

  
  return (
    <form onSubmit={handlesumbit}  className='h-screen w-full flex items-center justify-center '>
      <div className='h-[680px] w-[500px] flex flex-col items-center   border-blue-200 rounded-4xl outline-none shadow-xl shadow-blue-200'>

        <h1 className='mb-26 py-12 text-3xl uppercase font-bold '>Register</h1>

        <input  className='text-gray-800 mb-10 outline-none bg-transparent text-2xl rounded border-gray-500 shadow-xl px-8 py-3 '
      type="text"
      placeholder='Enter username'
      value={name}
      onChange={(e)=>{setName(e.target.value)}}
       />
        <input  className='text-gray-800 mb-10 outline-none bg-transparent text-2xl rounded border-gray-500 shadow-xl px-8 py-3 '
      type="text"
      placeholder='@gmail.com'
      value={email}
      onChange={(e)=>{setEmail(e.target.value)}}
       />
       <input  className='text-gray-800 outline-none bg-transparent text-2xl rounded border-gray-500 shadow-xl shadow= px-8 py-3 '
      type="password"
      value={password}
      placeholder='Password'
      onChange={(e)=>{setPassword(e.target.value)}}
       />
       <button className='mt-14 mb-5 bg-red-600 font-bold px-8 py-4 rounded-2xl uppercase text-white '>Register</button>
       <p >Already have an account <Link className='text-blue-500 underline' to='/login'>Login</Link></p>
      </div>
    </form>
  )
}

export default RegisterFrom
