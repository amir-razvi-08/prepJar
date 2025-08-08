"use client";
import React, { useEffect, useState } from "react";
import InterviewCard from "./components/InterviewCard";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";

const Records = () => {
    const user = useAppSelector((state) => state.user.user);
     const [latestInterviews, setLatestInterviews] = useState([]);
    useEffect(() => {
        if (!user) {
            console.log("user not found");
            return;
        }
        const getInterviews = async () => {
            try {
                const res = await axios.get(`/api/get-interviews?userId=${user?.id}`);
                console.log("records==", res.data);
                setLatestInterviews(res.data);
            } catch (error) {
                console.log("error detting records", error);
            }
        };
        getInterviews();
    }, [user]);
    return (
        <div className="p-8 pt-12 md:pt-8 bg-gray-100 ">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Records</h1>
            <InterviewCard latestInterviews={latestInterviews} />
        </div>
    );
};

export default Records;
