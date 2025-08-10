"use server";

import { signIn } from "@/lib/auth";

export const handleLogin = async (email: string, password: string): Promise<null | Error> => {
    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (!result?.error) {
            return null;
        }
        return null;
    } catch (error) {
        console.error("Login error:", error);
        return error as Error;
    }
};
