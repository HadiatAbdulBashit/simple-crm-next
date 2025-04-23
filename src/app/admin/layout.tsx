import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Purple box CRM",
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
