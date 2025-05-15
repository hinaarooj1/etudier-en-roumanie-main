import * as React from "react";
import { ChevronRight, Contact, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Contact,
  },
  {
    title: "contact details",
    url: "/admin/dashboard/contactDetails",
    icon: Contact,
  },
  {
    title: "representations",
    url: "/admin/dashboard/representation",
    icon: Contact,
  },
  {
    title: "mandate",
    url: "/admin/dashboard/mandate",
    icon: Contact,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="ml-2 sidebar border-r border-sidebar-border">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 h-auto">
            <div className="flex flex-row items-center mt-3 gap-1">
              <svg
                width="32"
                height="27"
                viewBox="0 0 32 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M31.9312 25.4146L29.7628 17.777V1.1469C29.7628 0.512522 29.2503 0 28.6159 0H3.38407C2.74969 0 2.23717 0.512522 2.23717 1.1469V17.777L0.0688094 25.4146C-0.199996 26.1637 0.351951 26.9522 1.14761 26.9522H30.8524C31.648 26.9522 32.2 26.1637 31.9312 25.4146ZM4.8177 2.58053H27.1823V16.7376H4.8177V2.58053ZM13.0001 24.3717L13.2904 23.0456H18.6773L18.9676 24.3717H13.0001ZM21.0284 24.3717L20.3439 21.2643C20.3152 21.1317 20.1969 21.0385 20.0643 21.0385H11.907C11.7708 21.0385 11.6561 21.1317 11.6274 21.2643L10.9429 24.3717H3.04717L4.56323 19.0314H27.4368L28.9528 24.3717H21.0284Z"
                  fill="#1C1C1C"
                />
              </svg>

              <div className="w-[127px] text-[#141414] text-sm font-semibold font-['Open Sans']">
                ETUDIER
              </div>
            </div>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
