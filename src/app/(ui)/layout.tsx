import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 bg-gray-100 pt-4">
                    <SidebarTrigger className="md:hidden fixed top-4 left-4 z-50 shadow-md bg-white rounded-full p-2" />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
