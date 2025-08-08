import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Loading from "@/app/components/Loading";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCommentDots, FaLightbulb, FaCalendarAlt, FaComments, FaStar, FaInfinity } from "react-icons/fa";
import { BsPuzzleFill } from "react-icons/bs";
import { FaBolt } from "react-icons/fa6";

interface FeedbackDialogProps {
    feedbackId: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface FeedbackData {
    communicationAndClarity: number;
    confidenceAndDelivery: number;
    fluencyAndFlow: number;
    problemSolvingSkills: number;
    overallScore: number;
    feedbackSummary: string[];
    suggestions: string[];
    createdAt: string;
}

function FeedbackDialog({ feedbackId, open, onOpenChange }: FeedbackDialogProps) {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);

    useEffect(() => {
        if (!open || !feedbackId) return;

        const fetchFeedback = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/api/feedback?feedbackId=${feedbackId}`);
                setFeedback(res.data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                setFeedback(null);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [open, feedbackId]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:max-w-[600px] md:max-w-[850px] lg:max-w-[1000px] overflow-y-auto max-h-[95vh] min-h-[40vh]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-800">Interview Feedback</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">This is AI-generated feedback based on your interview.</DialogDescription>
                </DialogHeader>

                {loading ? (
                    <Loading content="Loading interview feedback. This will only take a moment..." />
                ) : feedback ? (
                    <div className="space-y-6 text-gray-800 mt-4">
                        {/* SCORE BLOCK */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="bg-purple-50 p-4 rounded-md shadow-sm flex items-center justify-between col-span-2 md:col-span-1">
                                <span className="text-gray-600 font-medium flex items-center gap-1">
                                    <FaComments className="text-purple-500 font-bold" />
                                    Communication & Clarity
                                </span>
                                <span className="font-semibold text-purple-700">{feedback.communicationAndClarity}/100</span>
                            </div>
                            <div className="bg-cyan-50 p-4 rounded-md shadow-sm flex items-center justify-between col-span-2 md:col-span-1">
                                <span className="text-gray-600 font-medium flex items-end gap-1">
                                    <FaBolt className="text-cyan-600 font-bold text-lg " />
                                    Confidence & Delivery
                                </span>
                                <span className="font-semibold text-cyan-700">{feedback.confidenceAndDelivery}/100</span>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-md shadow-sm flex items-center justify-between col-span-2 md:col-span-1">
                                <span className="text-gray-600 font-medium flex items-end gap-1">
                                    <FaInfinity className="text-pink-600 font-bold text-lg " />
                                    Fluency & Flow
                                </span>
                                <span className="font-semibold text-pink-700">{feedback.fluencyAndFlow}/100</span>
                            </div>
                            <div className="bg-green-50 p-4 rounded-md shadow-sm flex items-center justify-between col-span-2 md:col-span-1">
                                <span className="text-gray-600 font-medium flex items-center gap-1">
                                    <BsPuzzleFill className=" -rotate-45 text-green-600 " />
                                    Problem Solving
                                </span>
                                <span className="font-semibold text-green-700">{feedback.problemSolvingSkills}/100</span>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-md shadow-sm flex items-center justify-between col-span-2 md:col-span-1">
                                <span className="text-gray-600 font-medium flex items-center gap-1">
                                    <FaStar className="text-yellow-500 font-bold" />
                                    Overall Score
                                </span>
                                <span className="font-bold text-yellow-600">{feedback.overallScore}/10</span>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-md shadow-sm flex items-center justify-between col-span-2 md:col-span-1 border border-muted">
                                <span className="text-gray-600 font-medium flex items-center gap-1">
                                    <FaCalendarAlt className="text-blue-600" /> Created At
                                </span>
                                <span className="text-sm text-blue-700">{new Date(feedback.createdAt).toLocaleString()}</span>
                            </div>
                        </div>

                        {/* SUMMARY */}
                        <div>
                            <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-2">
                                <FaCommentDots className="text-purple-500" />
                                Feedback Summary
                            </h3>
                            <ul className="space-y-2 text-sm pl-2">
                                {feedback.feedbackSummary.map((point, idx) => (
                                    <li
                                        key={idx}
                                        className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-purple-500"
                                    >
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SUGGESTIONS */}
                        <div>
                            <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-2">
                                <FaLightbulb className="text-yellow-500" />
                                Suggestions for Improvement
                            </h3>
                            <ul className="space-y-2 text-sm pl-2">
                                {feedback.suggestions.map((point, idx) => (
                                    <li
                                        key={idx}
                                        className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-400"
                                    >
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground mt-4">No feedback was found for this interview.</p>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default FeedbackDialog;
