import { Home, LayoutDashboard, List, Settings } from "lucide-react";
import { LuReceiptIndianRupee } from "react-icons/lu";

export const SideBarOptions = [
    {
        name: "Home",
        icon: Home,
        path: "/",
    },
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        name: "Records",
        icon: List,
        path: "/records",
    },
    {
        name: "Billing",
        icon: LuReceiptIndianRupee,
        path: "/billing",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings",
    },
];