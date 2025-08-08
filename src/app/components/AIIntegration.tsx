"use client";
import { FaBrain, FaRobot, FaChartLine, FaLightbulb, FaChartBar, FaUser } from "react-icons/fa";

const highlights = [
    {
        icon: <FaBrain className="text-blue-600 text-xl" />,
        title: "LLM-Powered Question Generation",
        text: "Uses GPT to generate tailored interview questions based on your role and level.",
        bg: "bg-blue-100",
    },
    {
        icon: <FaRobot className="text-purple-600 text-xl" />,
        title: "Real-Time Answer Evaluation",
        text: "Analyzes responses for technical accuracy, behavior, and communication.",
        bg: "bg-purple-100",
    },
    {
        icon: <FaChartLine className="text-green-600 text-xl" />,
        title: "Adaptive Learning System",
        text: "Identifies weak areas and recommends targeted practice questions.",
        bg: "bg-green-100",
    },
];

const AIIntegration = () => {
    return (
        <section className="py-16 bg-gray-100 text-black px-8" id="ai" >
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Advanced AI Integration</h2>
                <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                    Our platform leverages cutting-edge AI to provide personalized, realistic interview experiences.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Highlights Column */}
                    <div className="flex flex-col h-full justify-between gap-6">
                        {highlights.map((h, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex items-start">
                                <div className={`w-12 h-12 rounded-full ${h.bg} flex items-center justify-center mr-4`}>{h.icon}</div>
                                <div>
                                    <h3 className="text-lg font-semibold">{h.title}</h3>
                                    <p className="text-gray-600">{h.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right AI Example Column */}
                    <div className="h-full">
                        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 h-full flex flex-col justify-between">
                            <div className="flex items-center mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>

                            <div className="mb-6 space-y-4">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center mr-3">
                                        <FaRobot className="text-blue-600" />
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 max-w-md">
                                        <p className="text-gray-800 text-sm">
                                            Tell me about a time you had to learn a new skill quickly to complete a project.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center mr-3">
                                        <FaUser className="text-purple-600" />
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200 max-w-md">
                                        <p className="text-gray-800 text-sm">
                                            In my internship, I had to use Figma for UI design, which I hadn’t worked with before. I watched tutorials,
                                            studied design systems, and delivered prototypes within a week.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <div className="flex items-start">
                                    <FaLightbulb className="text-yellow-500 mr-2 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-yellow-800 mb-1">AI Feedback</h4>
                                        <p className="text-yellow-700 text-sm">
                                            Strong initiative! Consider briefly highlighting the impact—how your quick learning benefited the project.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIIntegration;
