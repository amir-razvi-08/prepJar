"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { handleLogout } from "@/actions/logout";
import { clearUser } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function SettingsPage() {
    const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const logoutHandler = async () => {
        await handleLogout();
        dispatch(clearUser());
        toast.success("Logged out successfully");
        setTimeout(() => {
            window.location.replace("/");
        }, 100);
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            toast.success("Profile updated");
            setLoading(false);
        }, 1000);
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            toast.success("Password changed");
            setPassword("");
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="w-full mx-auto p-8 pt-12 md:pt-8 bg-gray-100">
            <div className="w-full flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
                <Button variant="destructive" onClick={logoutHandler} className="cursor-pointer hover:bg-red-700 font-semibold">
                    Logout
                </Button>
            </div>
            {/* Profile Card */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Profile"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Password Card */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Changing..." : "Change Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
