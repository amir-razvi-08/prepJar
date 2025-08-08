"use server";

import { signIn } from "@/lib/auth";

export const handleLogin = async (email: string, password: string): Promise<null | Error> => {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: true,
            redirectTo: "/",
        });
        return null;
    } catch (error) {
        console.error("Login error:", error);
        return error as Error; 
    }
};
