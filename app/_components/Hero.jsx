"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button";
import { useUser} from "@clerk/nextjs";
import Link from "next/link";

const Hero = () => {
  const { isSignedIn } = useUser();
  return (
    <section className="bg-gray-50 flex items-center flex-col">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Manage Your Expense
          <strong className="font-extrabold text-primary sm:block"> Control Your Money. </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
          Start creating your budget and save yours!!
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4 ">
          <Link href={isSignedIn ? '/dashboard' : '/sign-in'}>
          <Button
            className="block w-fullrounded bg-primary px-12 py-2 text-lg font-md text-white shadow hover:bg-blue-700 focus:outline-none focus:ring sm:w-auto"
          >
            Get Started
          </Button>
          </Link>
  
         
        </div>
      </div>
    </div>
    <Image
     src={'/dashboard.png'}
    alt='dashbaord'
    width={900}
    height={700}
    className='-mt-9 rounded-xl border-2'
    />
  </section>
  )
}

export default Hero
