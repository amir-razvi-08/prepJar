import { generateInterviewChain } from "@/lib/agents/interviewQuesAgent";
import { Interview } from "@/models/interview.model";
import { User } from "@/models/user.model";
import { InterviewFormInput } from "@/controllers/type";

export const generateInterviewQuestions = async (input: InterviewFormInput) => {
    const { jobTitle, technicalSkills, interviewTitle, interviewType, difficulty, duration, userEmail } = input;

    if (!userEmail) throw new Error("User email is required");

    const user = await User.findOne({ email: userEmail });

    if (!user) throw new Error("User not found");

    const formattedInput = {
        jobTitle,
        technicalSkills: technicalSkills.join(", "),
        interviewType: interviewType.join(", "),
        difficulty,
        duration,
    };

    const result = await generateInterviewChain.invoke(formattedInput);
    console.log("result=", result);

    if (!result) throw new Error("Failed to generate interview questions");

    const minutes = parseInt(duration);

    const interview = await Interview.create({
        user: user._id,
        feedback: "",
        jobTitle,
        technicalSkills,
        interviewTitle,
        interviewType,
        difficulty,
        duration: minutes,
        questionList: result,
    });

    if (!interview) throw new Error("Failed to save interview session");

    return interview;
};
