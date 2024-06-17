"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

const ExpensesScreen = ({ params }) => {
  const { user } = useUser();
  useEffect(() => {
    user && getbudgetInfo();
  }, [user]);
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState([]);
  const route=useRouter();
  const getbudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);
       setBudgetInfo(result[0]);
       getExpensesList();
  };

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));

       setExpenseList(result);
  };

  const deleteBudget=async()=>{
    const deleteExpenseResult=await db.delete(Expenses)
    .where(eq(Expenses.budgetId,params.id))
    .returning();

   if(deleteExpenseResult){
    const deleteresult =await db.delete(Budgets)
    .where(eq(Budgets.id,params.id))
    .returning();
   }
   toast('Budget Deleted!');
   route.replace('/dashboard/budgets');
  }
  return (
    <div className="p-10">
      <div className="text-2xl font-bold flex justify-between items-center">
        <div className="flex gap-3 items-center">
        <ArrowLeft onClick={()=>route.back()} className="cursor-pointer"/> My Expenses
        </div>
      <div className="flex gap-2 items-center">
         <EditBudget budgetInfo={budgetInfo} refreshData={()=>getbudgetInfo()}/>
          <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex gap-2" variant="destructive">
              <Trash />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
               current budget along with expenses  and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getbudgetInfo()}
        />
      </div>
      <div className="mt-4">

        <ExpenseListTable
          expenseList={expenseList}
          refereshData={() => getbudgetInfo()}
        />
      </div>
    </div>
  );
};

export default ExpensesScreen;
