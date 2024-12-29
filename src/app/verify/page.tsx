"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Verify() {
  // const router = useRouter;

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verify", { token });
      setVerified(true);
      setError(false)
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    //getting token using nextjs properties , can also pass router in dependency array
    // const {query}:any = router
    // const urlToken2 = query.token
  }, []);

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center  justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `Your verification token is ${token}` : "No Token"}
      </h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href='/login'>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
}
