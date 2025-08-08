import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/user.model";
import { connectDB } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    throw new CredentialsSignin("Please provide both email and password");
                }

                await connectDB();

                const user = await User.findOne({ email }).select("+password");
                if (!user) {
                    throw new CredentialsSignin("Invalid email or password");
                }

                const isMatch = await user.isPasswordCorrect(password);
                if (!isMatch) {
                    throw new CredentialsSignin("Invalid email or password");
                }

                return {
                    id: user._id.toString(),
                    name: user.fullName,
                    email: user.email,
                };
            },
        }),
    ],

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        signIn: async ({ user, account }) => {
            if (account?.provider === "google") {
                await connectDB();
                let existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                     existingUser = await User.create({
                        fullName: user.name,
                        email: user.email,
                        avatar: user.image,
                        googleId: user.id,
                    });
                }
                user.id = existingUser._id.toString();
            }
            return true;
        },
    },
});


