"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const router = useRouter();
    return (
        <footer className="bg-gray-900 text-gray-300 pb-6 pt-10" id="footer">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-">
                            <Image
                                src="/prepjar.png"
                                alt="prepJar"
                                width={100}
                                height={100}
                                onClick={() => router.replace("/")}
                                className="cursor-pointer"
                            />
                        </div>
                        <p className="mb-4">The most advanced AI-powered interview preparation platform for job seekers.</p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 hover:text-white"
                            >
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white">
                                <FaLinkedinIn />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 space-x-2">
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="/billing" className="hover:text-white">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Roadmap
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Interview Guides
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="hover:text-white">
                                        Community
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        About Us
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="hover:text-white">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
                    <p>© 2025 prepJar. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
