
import React from 'react'
import RegisterForm from './RegisterForm'

export default function Register() {

  return (
    <>
      <div className='md:w-1/2 mx-auto min-h-screen md:p-[50px] p-5 '>
        <h1 className='rounded-lg  text-black text-center text-5xl font-semibold my-5'>Become a fresh cart user </h1>

        <RegisterForm />

      </div>
    </>
  )
}
