"use client";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types";
import { CalendarSync, FileText, LayoutGrid, Users2 } from "lucide-react";
import Link from "next/link";
import AppLogo from "./app-logo";

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutGrid,
  },
  {
    title: "Customer",
    href: "/admin/customers",
    icon: Users2,
  },
  {
    title: "Report",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "Automation",
    href: "/admin/automation",
    icon: CalendarSync,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/admin' prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className='w-full'>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter className={`overflow-hidden ${state === "collapsed" ? "hidden" : ""} delay-100 transition-all`}>
        <p className='text-sm text-center'>Version 0.1</p>
      </SidebarFooter>
    </Sidebar>
  );
}
