import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginForm } from "@/client/LoginForm";
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Login() {
    const session = await auth();
    if (session?.user) redirect("/");

    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <p>or</p>
                    <form
                        action={async () => {
                            "use server";
                            await signIn("google");
                        }}
                    >
                        <Button type="submit" variant="outline">
                            Login with google
                        </Button>
                    </form>
                    <span>
                        {"Don't have an account?"}
                        <Link href="/signup" className="text-blue-500 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </span>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Login;
