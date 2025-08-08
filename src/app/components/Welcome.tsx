"use client";

import { useState } from "react";
import { FaArrowRight, FaRobot } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WelcomeWindow() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (name.trim()) setStarted(true);
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-xl rounded-2xl border border-gray-200">
      <CardContent className="p-6 space-y-6">
        {/* Header dots */}
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {!started ? (
          <div className="space-y-8 px-2">
            <p className="text-lg text-gray-700">Please Enter Your name:</p>
            <Input
              placeholder="Enter Your Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg h-12 outline-none"
            />
            <Button
              onClick={handleStart}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm"
            >
              Submit
              <FaArrowRight className="ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Message 1: Welcome */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 border border-blue-200">
                <FaRobot className="text-blue-600" />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm text-gray-800">
                Welcome <span className="font-semibold">{name}</span>! 👋 <br />
                I'm your AI interviewer. I'm here to help you simulate real interview scenarios.
              </div>
            </div>

            {/* Message 2: First Question */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 border border-blue-200">
                <FaRobot className="text-blue-600" />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm text-gray-800">
                Let's begin with a behavioral question: <br />
                <span className="font-semibold">
                  “Tell me about a time you demonstrated leadership under pressure.”
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
