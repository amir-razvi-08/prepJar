"use client";
import { FaComments, FaLanguage, FaCheckCircle } from "react-icons/fa";

const features = [
    {
        icon: <FaComments className="text-white text-2xl" />,
        title: "Mock Interview Simulator",
        desc: "Practice realistic mock interviews with AI that asks domain-relevant questions and provides constructive feedback.",
        bullets: ["Behavioral and situational questions", "Role-based theoretical Q&A", "Instant AI-driven feedback"],
        bg: "gradient-bg",
    },

    {
        icon: <FaComments className="text-white text-2xl" />,
        title: "HR Interview Practice",
        desc: "Master behavioral questions with AI that analyzes your clarity and emotional intelligence.",
        bullets: ["Voice-based answer recording", "STAR method evaluation", "Confidence & tone analysis"],
        bg: "gradient-bg",
    },
    {
        icon: <FaLanguage className="text-white text-2xl" />,
        title: "English Fluency Coach",
        desc: "Improve your English with conversational AI that corrects fluency and grammar in real-time.",
        bullets: ["Pronunciation scoring", "Vocabulary suggestions", "Accent neutralization"],
        bg: "gradient-bg",
    },
];

const Features = () => {
    return (
        <section className="py-16 bg-gray-100  px-8" id="features" >
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Powerful Features to Boost Your Interview Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className={`w-16 h-16 ${f.bg} rounded-full flex items-center justify-center mb-4`}>{f.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                            <p className="text-gray-600 mb-4">{f.desc}</p>
                            <ul className="space-y-2 text-gray-700">
                                {f.bullets.map((b, j) => (
                                    <li key={j} className="flex items-center">
                                        <FaCheckCircle className="text-green-500 mr-2" />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
