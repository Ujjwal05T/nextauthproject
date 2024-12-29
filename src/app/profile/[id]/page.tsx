import React  from 'react'

//example of dynamic route in nextjs

export default function page({params}:any) {
  return (
    <div className='flex flex-col items-center  justify-center min-h-screen py-2'>
        <h1>Profile Page</h1>
        <hr />
        <h2 className='bg-green-500 rounded text-black p-3 '>{params.id}</h2>   
    </div>
  )
}

