'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React,{useState, useEffect} from 'react'
import toast from 'react-hot-toast';

export default function Login() {

  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
    <div className="flex flex-col items-center  justify-center min-h-screen py-2">
        <h2 className="text-2xl">{loading ? "Processing..." : "Login"}</h2>
        <hr className="text-2xl m-2"/>

        <label htmlFor="email" className="text-star">Email</label>
        <input 
        id="email"
        value={user.email}
        onChange={(e)=> setUser({...user,email:e.target.value})}
        placeholder="Email"
        className="p-2 rounded-lg shadow-md text-black focus:outline-none mb-4"
        type="text" />

        <label htmlFor="password" className="text-star">Password</label>
        <input 
        id="password"
        value={user.password}
        onChange={(e)=> setUser({...user,password:e.target.value})}
        placeholder="Password"
        className="p-2 rounded-lg shadow-md text-black focus:outline-none mb-4"
        type="text" />

        <button disabled={buttonDisabled} onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
            {buttonDisabled ? "Please fill the form": "Login"}
        </button>
        <Link href='/signup'>Visit Register Page</Link>
    </div>
    </>
  )
}

