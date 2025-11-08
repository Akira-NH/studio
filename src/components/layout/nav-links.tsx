"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  Users,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const links = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/rooms", icon: BedDouble, label: "Rooms" },
  { href: "/bookings", icon: CalendarDays, label: "Bookings" },
  { href: "/guests", icon: Users, label: "Guests" },
  { href: "/payments", icon: CreditCard, label: "Payments" },
  { href: "/reports", icon: Sparkles, label: "AI Insights" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            <a href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
