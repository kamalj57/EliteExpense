"use client"
import React from 'react'
import BudgetList from './_components/BudgetList'
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
const Budgets = () => {
  const route=useRouter();
  return (
    <div className='p-10'>
     <div className="flex gap-3 items-center font-bold text-3xl">
        <ArrowLeft onClick={()=>route.back()} className="cursor-pointer"/> My Budgets
        </div>
      <BudgetList/>
    </div>
  )
}

export default Budgets