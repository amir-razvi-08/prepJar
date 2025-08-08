'use server';

import { signOut } from "@/lib/auth";

export const handleLogout = async () => {
    try {
        const result = await signOut();
        console.log("User logged out successfully",result);
        return result;
    } catch (error) {
        console.error("Logout error:", error);
    }
};