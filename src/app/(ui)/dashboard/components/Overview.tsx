import React from "react";
import { FaCode, FaComments, FaCoins } from "react-icons/fa";

interface OverviewProps {
    value: {
        credits: number;
        sessions: number;
        overallScore?: number;
    };
}

function Overview({ value }: OverviewProps) {
    const credits = value?.credits ?? 0;

    const sessions = value?.sessions?? 0;
    const score = value?.overallScore?.toFixed(1) ?? 0;
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className={`rounded-xl bg-yellow-50 p-6 shadow flex items-center justify-between`}>
                <div>
                    <h4 className="text-gray-600 font-medium mb-1">Credits</h4>
                    <p className="text-2xl font-bold">{credits}</p>
                </div>
                <div className="text-4xl">
                    <FaCoins className="text-yellow-500" />
                </div>
            </div>

            <div className={`rounded-xl bg-blue-50 p-6 shadow flex items-center justify-between`}>
                <div>
                    <h4 className="text-gray-600 font-medium mb-1">Interviews Practiced</h4>
                    <p className="text-2xl font-bold">{sessions} Sessions</p>
                </div>
                <div className="text-4xl">
                    <FaCode className="text-blue-500" />
                </div>
            </div>

            <div className={`rounded-xl bg-purple-50 p-6 shadow flex items-center justify-between`}>
                <div>
                    <h4 className="text-gray-600 font-medium mb-1">Avg Feedback Score</h4>
                    <p className="text-2xl font-bold">{score}/10</p>
                </div>
                <div className="text-4xl">
                    <FaComments className="text-purple-500" />
                </div>
            </div>
        </section>
    );
}

export default Overview;
