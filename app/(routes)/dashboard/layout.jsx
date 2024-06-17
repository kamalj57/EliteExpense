"use client"
import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result?.length === 0) {
      router.replace('/dashboard/budgets');
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <div className={`fixed ${showSidebar ? 'block' : 'hidden'} lg:block lg:w-64`}>
        <SideNav />
      </div>

      <div className={`lg:ml-64 border ${showSidebar ? 'lg-64' : ''}`}>
        <div className="lg:hidden">
          <DashboardHeader onToggleSidebar={toggleSidebar} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
