import React, { useState } from "react";
import { FaUserTie, FaCalendarAlt, FaTools } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FeedbackDialog from "./FeedbackDialog";

interface Interview {
    interviewTitle: string;
    feedbackId: string;
    technicalSkills: string[];
    createdAt: string | Date;
}

interface InterviewCardProps {
    latestInterviews: Interview[];
}

function InterviewCard({ latestInterviews = [] }:InterviewCardProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);

    const handleOpenDialog = (feedbackId: string) => {
        setSelectedFeedbackId(feedbackId);
        setOpenDialog(true);
    };

    return (
        <div className="space-y-6">
            {latestInterviews.map((interview, i) => (
                <Card key={i} className="bg-white border shadow-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-purple-700 flex items-center gap-2 text-lg">
                                <FaUserTie className="text-purple-600" />
                                {interview?.interviewTitle}
                            </CardTitle>

                            <Button
                                onClick={() => handleOpenDialog(interview?.feedbackId)}
                                variant="ghost"
                                className="text-purple-600 font-semibold text-xs px-2 py-1 border border-purple-600 hover:border-black"
                            >
                                View Feedback
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                            <FaTools className="text-green-500" />
                            <span>
                                <strong>SkillSet:</strong> {interview?.technicalSkills?.join(", ")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaCalendarAlt className="text-blue-600" />
                            <span>
                                <strong>Date:</strong> {new Date(interview?.createdAt).toLocaleDateString("en-GB")}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <FeedbackDialog feedbackId={selectedFeedbackId} open={openDialog} onOpenChange={setOpenDialog} />
        </div>
    );
}

export default InterviewCard;
