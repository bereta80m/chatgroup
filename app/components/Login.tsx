"use client"
import {signIn} from "next-auth/react"
import React from 'react'

function Login() {

  return (
    <div className='w-full h-screen grid place-items-center '>
      <div className=' bg-red-500   '>
      <button onClick={()=> signIn("google")} className='p-5'>Login</button>

      </div>
    </div>
  )
}

export default Login
