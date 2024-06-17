"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ExpenseListTable from './_components/ExpenseListTable'
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
const Expense = () => {
    const { user } = useUser();
    const route=useRouter();
  useEffect(() => {
    user && getExpensesList();
  }, [user]);
    const [expenseList, setExpenseList] = useState([]);
    const getExpensesList = async () => {
      const result= await db.select({
        id:Expenses.id,
        name:Expenses.name,
        amount:Expenses.amount,
        createdAt:Expenses.createdAt
      }).from(Budgets)
      .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
      .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
           setExpenseList(result);
      };
  return (
    <div className='p-10'>
     <div className="flex gap-3 items-center font-bold text-3xl">
        <ArrowLeft onClick={()=>route.back()} className="cursor-pointer"/> My Expenses
        </div>
     <ExpenseListTable expenseList={expenseList}
          refereshData={() => getExpensesList()}/>
  </div>
  )
}

export default Expense