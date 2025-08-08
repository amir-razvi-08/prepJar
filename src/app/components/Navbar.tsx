"use client";

import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "MODES", id: "modes" },
    { label: "FEATURES", id: "features" },
    { label: "AI", id: "ai" },
    { label: "ABOUT", id: "about" },
    { label: "BILLING", href: "/billing" },
];

const Navbar = () => {
    const user = useAppSelector((state) => state.user.user);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleNavClick = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md h-16">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Image src="/pepjar-logo.png" alt="logo" width={100} height={40} onClick={() => router.replace("/")} className="cursor-pointer w-32" />

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 font-semibold">
                    {navLinks.map((link) =>
                        link.href ? (
                            <a key={link.label} href={link.href} className="text-gray-800 hover:text-purple-700 hover:underline">
                                {link.label}
                            </a>
                        ) : (
                            <button key={link.id} onClick={() => handleNavClick(link.id!)} className="text-gray-800 hover:text-purple-700 hover:underline">
                                {link.label}
                            </button>
                        )
                    )}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <div
                            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border-2 border-gray-800 hover:border-white hover:bg-white cursor-pointer transition-all duration-200 group"
                            onClick={() => router.push("/dashboard")}
                        >
                            <Image src={user?.image ?? "/avatar.png"} alt="user" width={36} height={36} className="rounded-full" />
                            <span className="text-sm text-gray-800 font-bold group-hover:text-purple-900 transition-colors duration-200 tracking-wider">Dashboard</span>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => router.replace("/login")}
                                className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.replace("/signup")}
                                className="px-4 py-2 rounded-full bg-purple-700 text-white hover:bg-purple-800"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>

                {/* Hamburger */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes className="text-2xl text-purple-600" /> : <FaBars className="text-2xl text-purple-600" />}
                </button>
            </div>

            {/* Mobile Slide-in Menu (Right, Half Width) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ x: "100%", scale: 0.95 }}
                        animate={{ x: "0%", scale: 1 }}
                        exit={{ x: "100%", scale: 0.95 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            bounce: 0.4,
                        }}
                        className="fixed top-16 right-0 w-[60%] rounded-lg bg-white shadow-lg z-50 px-6 py-6 md:hidden"
                    >
                        <div className="flex flex-col space-y-4 font-semibold">
                            {navLinks.map((link) =>
                                link.href ? (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="text-gray-800 font-bold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <button
                                        key={link.id}
                                        onClick={() => handleNavClick(link.id!)}
                                        className="text-left text-gray-800 font-bold"
                                    >
                                        {link.label}
                                    </button>
                                )
                            )}

                            {user ? (
                                <div
                                    className="flex items-center gap-2 cursor-pointer border-2 border-purple-400 p-2 rounded-full"
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push("/dashboard");
                                    }}
                                >
                                    <Image src={user?.image ?? "/avatar.png"} alt="user" width={36} height={36} className="rounded-full" />
                                    <span className="text-gray-700">Dashboard</span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            router.replace("/login");
                                        }}
                                        className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 border-2 border-purple-400"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            router.replace("/signup");
                                        }}
                                        className="px-4 py-2 rounded-full bg-purple-700 text-white hover:bg-purple-800"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
