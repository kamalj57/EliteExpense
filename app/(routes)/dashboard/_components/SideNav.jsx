"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { usePathname  } from 'next/navigation'
import Link from 'next/link';
import {useEffect} from 'react'

const SideNav = () => {
    const {user} =useUser();
    const menuList=[
        {
            id:1,
            name:"Dashboard",
            icon:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:"Budgets",
            icon:PiggyBank,
            path:'/dashboard/budgets'
        },
        {
           id:3,
           name:"Expenses",
           icon:ReceiptText,
           path:'/dashboard/expenses'
        }
    ]

    const path=usePathname();
    useEffect(()=>{

    },[path]);
  return (
    <div className='h-screen p-5 border shadow-sm'> 
        <Image src={'/logo.svg'} alt='logo' width={150} height={100}/>
        <div className='mt-5'>
            {menuList.map((menu,index)=>(
                <Link href={menu.path} key={index}>
                <h2 className={`flex gap-2 items-center mb-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md
                hover:text-primary hover:bg-blue-100
                ${path===menu.path && 'text-primary bg-blue-100'}`}>
                    <menu.icon/>
                    {menu.name}
                </h2>
                </Link>
            ))}
        </div>
        <div className='fixed shadow-md bottom-20 p-5 font-medium flex gap-2  bg-slate-100 items-center border rounded-md  hover:text-primary hover:bg-blue-100'>
            <UserButton/>
             <h2 className='font-md'>Profile</h2>
        </div>
        </div>
  )
}

export default SideNav