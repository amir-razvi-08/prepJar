import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
// import { cookies } from "next/headers";
// import { decode } from "next-auth/jwt";

 function Signup() {

    // make function async to use await

    // const cookiss = (await cookies()).get("authjs.session-token");
    // console.log("Cookies:", cookiss?.name);

    // const data = await decode({
    //     token: cookiss?.value,
    //     salt:cookiss?.name,
    //     secret: process.env.AUTH_SECRET!,
    // })

    // console.log("Decoded Data:", data);



    const signUp = async (formData: FormData) => {
        "use server";
        const name = formData.get("name") as string | undefined;
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        console.log(formData);

        if (!name || !email || !password) console.log("please provide all fields");

        await connectDB();

        const user = await User.findOne({ email });
        if (user) throw new Error("User already exists");

        const newUser = await User.create({ fullName:name, email, password });
        if (!newUser) throw new Error("Failed to create user");

        redirect("/login");
    };

    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={signUp} className="flex flex-col gap-4">
                        <Input placeholder="Name" type="name" name="name" />
                        <Input placeholder="Email" type="email" name="email"/>
                        <Input placeholder="Password" type="password" name="password" />
                        <Button type="submit">Sign up</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <p>or</p>
                    <form action="">
                        <Button type="submit" variant="outline">
                            Login with google
                        </Button>
                    </form>
                    <span>
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-500 font-semibold hover:underline">
                            Login
                        </Link>
                    </span>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Signup;
