"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { UserInfo } from "@/components/user-info";
import { ChevronsUpDown } from "lucide-react";
import { UserMenuContent } from "@/components/user-menu-content";

export function NavUser() {
  const { state } = useSidebar();

  return (
    <SidebarMenu className='grow-0 w-fit'>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='rounded-lg'>
            <SidebarMenuButton
              size={state === "collapsed" ? "default" : "lg"}
              className={`text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group py-4 ${
                state === "collapsed"
                  ? "ps-0 hover:rounded-lg hover:bg-sidebar rounded-s-full active:rounded-lg active:bg-sidebar active:rounded-s-full"
                  : ""
              }`}
            >
              <UserInfo />
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg' align='end' side={"bottom"}>
            <UserMenuContent />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
