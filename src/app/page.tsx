"use client";
import Hero from "./components/Hero";
import Features from "./components/Features";
import InterviewModes from "./components/InterviewModes";
import AIIntegration from "./components/AIIntegration";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <main className="bg-gray-50">
            <Navbar/>
            <Hero />
            <InterviewModes />
            <Features />
            <AIIntegration />
            <CTA />
            <Footer />
        </main>
    );
}
