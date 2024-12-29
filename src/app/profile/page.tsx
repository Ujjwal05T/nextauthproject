'use client'
import React, { useState } from 'react'
import axios from 'axios'
import  Link  from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'


export default function ProfilePage() {
  const router = useRouter();
  const [data , setData] = useState('nothing')

  const getUserData = async () => {
    try {const response = await axios.get('/api/users/profile')
      console.log(response.data.data)
      setData(response.data.data.id)}
    catch(error:any) {
      console.log('error', error)
      toast.error(error.message) 
    }
  }

  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      toast.success("Logged out successfully")
      router.push('/login')
    } catch (error:any) {
      console.log('error', error)
      toast.error(error.message)     
    }
  }

  return (
    <div className='flex flex-col items-center  justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data==='nothing' ? 'No data' : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <hr />
      <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>logout</button>

      <button className='mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={getUserData}>Get Data</button>
    </div>
  )
}

