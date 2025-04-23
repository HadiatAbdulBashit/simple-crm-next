"use client";

import { AppSidebarHeader } from "@/components/app-sidebar-header";
import AutomationCard from "@/components/automation-card";
import { useSidebar } from "@/components/ui/sidebar";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Automation",
    href: "/automation",
  },
];

export default function Automation() {
  const { state } = useSidebar();
  return (
    <>
      <AppSidebarHeader breadcrumbs={breadcrumbs} />
      <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4'>
        <div className={`grid gap-4 sm:grid-cols-2 md:grid-cols-1 ${state === "collapsed" ? "md:grid-cols-2" : "lg:grid-cols-2 "}`}>
          <AutomationCard title='Email' description='Reaching out' active schedule='Day 1' />
          <AutomationCard title='Whatsapp' description='Reaching out' active schedule='Day 2' />
          <AutomationCard title='Telegram' description='Reaching out' active schedule='Day 4' />
          <AutomationCard title='Signal' description='Reaching out' schedule='Day 7' />
        </div>
      </div>
    </>
  );
}
