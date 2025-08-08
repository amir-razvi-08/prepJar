"use client";
import { FaPlayCircle } from "react-icons/fa";
import WelcomeWindow from "./Welcome";
import { toast } from "sonner";

const Hero = () => {
    const handleWathcDemo = () => {
        toast.info("video is not available");
    };

    return (
        <section className="gradient-bg text-white py-16 sm:py-44" id="hero">
            <div className="container mx-auto px-12 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">
                        Ace Every Interview with Confidence - <span className="text-green-400">Powered by AI</span>
                    </h1>

                    <p className="text-xl mb-12 text-gray-300 leading-8">
                        prepJar is your AI-powered partner for interview success.
                        <br />
                        Practice fluent English speaking in real-time with smart feedback.
                        <br />
                        Boost your confidence with personalized, mock interview sessions.
                    </p>

                    <button
                        className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-600"
                        onClick={handleWathcDemo}
                    >
                        <FaPlayCircle className="inline mr-2" /> Watch Demo
                    </button>
                </div>
                <div className="absolute top-18 right-0 w-24 h-24 bg-cyan-400 rounded-full opacity-20"></div>
                <div className="absolute top-20 right-[33rem] w-44 h-44 bg-purple-600 rounded-full opacity-20"></div>
                <div className="absolute bottom-12 right-[44rem] w-56 h-56 bg-yellow-400 rounded-full opacity-10"></div>
                <div className="md:w-1/2 relative">
                    <WelcomeWindow />
                </div>
            </div>
        </section>
    );
};

export default Hero;
