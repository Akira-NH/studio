"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  ChevronDown,
  LogOut,
  Search,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLinks } from "./nav-links";

export function DashboardLayout({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="h-16 items-center border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold font-headline">
            <Building2 className="h-6 w-6 text-sidebar-primary" />
            <span className="duration-200 group-data-[collapsible=icon]:opacity-0">
              Imperial
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <NavLinks />
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="justify-start gap-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/seed/user/40/40" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <span className="duration-200 group-data-[collapsible=icon]:opacity-0">
                  Staff Admin
                </span>
                <ChevronDown className="ml-auto h-4 w-4 duration-200 group-data-[collapsible=icon]:opacity-0" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="h-8 w-8" />
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
          </div>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/seed/user/40/40" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
