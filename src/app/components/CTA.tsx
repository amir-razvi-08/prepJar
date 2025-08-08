"use client";

import { FaStar, FaUsers, FaBriefcase } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
    {
        quote: "From intuitive front-end design to seamless backend integration, the site is a true showcase of full-stack excellence.",
        author: "Dhanshree",
        image: "/user Photos/Dhanshree.jpeg",
        role: "Full Stack Developer, GreatHire",
    },
    {
        quote: "Built with security at its core, the site ensures robust protection against vulnerabilities while maintaining smooth performance.",
        author: "Sujeeth",
        image: "/user Photos/Sujeeth.jpeg",
        role: "Information Security Analyst, GlobalSoft",
    },
    {
        quote: "Built with security at its core, the site ensures robust protection against vulnerabilities while maintaining smooth performance.",
        author: "Eswar",
        image: "/user Photos/avatar.jpeg",
        role: "Information Security Analyst, GlobalSoft",
    },
];

const CTA = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="gradient-bg text-white py-16" id="about">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Interview Skills?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Join thousands of job seekers who've landed offers at top companies with <strong>PrepJar</strong>
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4 text-black">
                    <Card className="bg-white bg-opacity-10 text-white px-4 py-2 rounded-full">
                        <CardContent className="flex items-center gap-2 p-0">
                            <FaStar className="text-yellow-300" />
                            <span>4.9/5 (2,500+ reviews)</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-white bg-opacity-10 text-white px-4 py-2 rounded-full">
                        <CardContent className="flex items-center gap-2 p-0">
                            <FaUsers />
                            <span>50,000+ users</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-white bg-opacity-10 text-white px-4 py-2 rounded-full">
                        <CardContent className="flex items-center gap-2 p-0">
                            <FaBriefcase />
                            <span>Top tech company placements</span>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="w-full max-w-5xl mx-auto mt-12">
                <Card className="overflow-hidden rounded-2xl shadow-xl">
                    <CardContent className="relative h-48 sm:h-28 flex items-center justify-center px-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 1.2 }}
                                className="absolute inset-0 px-4"
                            >
                                <div className="flex flex-col md:flex-row items-center h-full">
                                    {/* Avatar + Author */}
                                    <div className="flex items-center justify-between">
                                        <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                                            {testimonials[currentTestimonial].image ? (
                                                <Image
                                                    src={testimonials[currentTestimonial].image}
                                                    alt={testimonials[currentTestimonial].author}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-black">
                                                    {testimonials[currentTestimonial].author.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-black">{testimonials[currentTestimonial].author}</div>
                                            <div className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</div>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <div className="text-lg text-black md:text-xl font-medium md:ml-8 text-center md:text-left bg-white sm:w-[75%]">
                                        “{testimonials[currentTestimonial].quote}”
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default CTA;
