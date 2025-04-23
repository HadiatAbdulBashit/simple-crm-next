"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { type NavItem } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup className='px-2 py-0'>
      <SidebarGroupLabel></SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.href === pathname} tooltip={{ children: item.title }}>
              <Link href={item.href} prefetch className='flex justify-between gap-2 group/item'>
                <div className='flex gap-2 items-center'>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </div>
                {item.href !== pathname && <ChevronRight className='group-hover/item:translate-x-2 transition-transform' />}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
