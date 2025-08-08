"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleLogin } from "@/actions/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const LoginForm = () => {
    const router = useRouter();

    return (
        <form
            action={async (formData) => {
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;

                if (!email || !password) {
                    toast.error("Please fill in all fields");
                    return;
                }

                const error = await handleLogin(email, password);
                if (!error) {
                    toast.success("Login successful!");

                    router.refresh();
                }
            }}
            className="flex flex-col gap-4"
        >
            <Input placeholder="Email" type="email" name="email" />
            <Input placeholder="Password" type="password" name="password" />
            <Button type="submit">Login</Button>
        </form>
    );
};
