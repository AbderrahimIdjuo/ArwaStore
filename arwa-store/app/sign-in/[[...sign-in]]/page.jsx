import { SignIn } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <div className='grid place-items-center h-screen'>
        <SignIn/>
    </div>
  )
}

export default page