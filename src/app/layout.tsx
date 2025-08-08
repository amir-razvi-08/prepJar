import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { getServerUser } from "@/lib/getUser";
import { ReduxProvider } from "./reduxProvider";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const user: object | null = await getServerUser();

    return (
        <html lang="en">
            <head>
                <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            </head>
            <body>
                <ReduxProvider user={user}>
                    {children}

                    <Toaster position="top-right" duration={2000} closeButton />
                </ReduxProvider>
            </body>
        </html>
    );
}
