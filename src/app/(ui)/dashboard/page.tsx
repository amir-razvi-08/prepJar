"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./components/Header";
import Overview from "./components/Overview";
import Progress from "./components/Progress";
import InterviewSummary from "./components/InterviewSummary";
import InterviewCard from "./components/InterviewCard";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AverageFeedback } from "./type";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";

interface IinterviewData {
    _id: string;
    count: number;
}

interface IinterviewTypes {
    [key: number]: IinterviewData;
}

const DashboardPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [showDialog, setShowDialog] = useState(false);
    const [interviewId, setInterviewId] = useState<string | null>(null);

    const [avgScores, setAvgScores] = useState<AverageFeedback | null>(null);
    const [interviewData, setInterviewData] = useState<IinterviewTypes>();
    const [latestInterviews, setLatestInterviews] = useState([]);
    const [credits, setCredits] = useState(0);
    const [overallScore, setOverallScore] = useState<number>(0);
    const [sessions, setSessions] = useState(0);
    const user = useAppSelector((state) => state.user.user);
    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;
        const fetchAverages = async () => {
            try {
                const res = await axios.get<AverageFeedback>(`/api/feedback-averages?userId=${userId}`);
                setAvgScores(res.data);
                setOverallScore(res.data.averageOverallScore ?? 0);
            } catch (error) {
                console.error("Error fetching averages:", error);
            }
        };

        fetchAverages();
    }, [userId]);

    useEffect(() => {
        if (!userId) return;
        const fetchAverages = async () => {
            try {
                const res = await axios.get(`/api/interview-session?userId=${userId}`);
                console.log(res.data.titleBreakdown);
                setSessions(res.data.totalSessions[0].total);
                setInterviewData({ ...res.data?.titleBreakdown });
                setLatestInterviews(res.data.latestInterviews);
                setCredits(res.data.credits);
            } catch (error) {
                console.error("Error fetching averages:", error);
            }
        };

        fetchAverages();
    }, [userId]);

    useEffect(() => {
        const shouldShow = searchParams.get("showFeedback");
        const id = searchParams.get("interviewId");

        if (shouldShow === "true" && id) {
            setInterviewId(id);
            setShowDialog(true);

            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete("showFeedback");
            newUrl.searchParams.delete("interviewId");
            router.replace(newUrl.toString());
        }
    }, [searchParams, router]);
    return (
        <ScrollArea className="flex-1 h-screen px-6 pt-12 md:pt-8  bg-gray-100">
            <Header />
            <Overview value={{ overallScore, credits, sessions }} />

            <section className="grid md:grid-cols-2 gap-6 mb-12">
                <Progress avgScore={avgScores ?? {}} />
                <InterviewSummary interviewData={interviewData} />
            </section>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Recent Records</h2>
                    <Link href="/records">
                        <Button variant="outline" className="flex items-center gap-2">
                            <FaArrowRight className="text-sm" />
                            View All
                        </Button>
                    </Link>
                </div>
                <InterviewCard latestInterviews={latestInterviews} />
            </div>
        </ScrollArea>
    );
};

export default DashboardPage;
