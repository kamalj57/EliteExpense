"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center shadow-sm border">
      <Image src={"./logo.svg"} alt="logo" width={150} height={100} />
      {isSignedIn ? (
        <div className="flex justify-between items-center gap-4">
          <Link href={"/dashboard"}>
            <Button variant="outline" className="flex gap-3 font-bold text-md">
              Dashboard <SquareArrowOutUpRight />
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link href={"/sign-in"}>
          <Button className="text-md font-md">Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
