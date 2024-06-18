import React from "react";
import { UserButton } from "@clerk/nextjs";
import { MenuIcon, LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
const DashboardHeader = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();
  useEffect(() => {}, [path]);
  return (
    <div className="p-5 shadow-sm border-b flex justify-between">
      <div>
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <Image src={"/logo.svg"} alt="logo" width={150} height={100} />
              <SheetDescription className="mt-5">
                {menuList.map((menu, index) => (
                  <Link href={menu.path} key={index}>
                    <h2
                      className={`flex gap-2 items-center mb-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md
                hover:text-primary hover:bg-blue-100
                ${path === menu.path && "text-primary bg-blue-100"}`}
                    >
                      <menu.icon />
                      {menu.name}
                    </h2>
                  </Link>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
