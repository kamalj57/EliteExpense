import React,{useEffect} from 'react'
import { usePathname  } from 'next/navigation'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
const SideSheet = () => {
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
    <div>
        <Sheet>
  <SheetTrigger>OPen</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

    </div>
  )
}

export default SideSheet