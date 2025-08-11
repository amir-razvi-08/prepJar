"use client";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "./constants";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function AppSidebar() {
    const router = useRouter();
    const path = usePathname();
    const { setOpenMobile } = useSidebar();
    const handleCreateInteview = () => {
        router.push("/custom-interview");
        setOpenMobile(false);
    };
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex justify-center">
                    <Image
                        src="/pepjar-logo.png"
                        alt="logo"
                        width={100}
                        height={100}
                        onClick={() => router.replace("/")}
                        className="cursor-pointer w-32"
                    />
                </div>
            </SidebarHeader>
            <div className="px-4 pt-2">
                <Button className="w-full cursor-pointer" onClick={handleCreateInteview}>
                    <Plus className="mr-2" />
                    Create New Interview
                </Button>
            </div>
            <SidebarContent>
                <SidebarGroup />
                <SidebarMenu>
                    {SideBarOptions.map((option, index) => (
                        <SidebarMenuItem key={index} className="p-1">
                            <SidebarMenuButton asChild className={`p-3 ${path === option.path && "bg-purple-100"}`} onClick={() => setOpenMobile(false)}>
                                <Link href={option.path} className="flex items-center gap-3">
                                    <option.icon className={`w-5 h-5 ${path == option.path && "text-primary"}`} />
                                    <span className={`text-base font-medium ${path == option.path && "text-primary"}`}>{option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
