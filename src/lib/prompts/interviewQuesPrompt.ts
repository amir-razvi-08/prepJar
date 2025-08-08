export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions including candidate introduction, and closing questions.

Job Title: {jobTitle}

Technical Skills: {technicalSkills}

Interview Type: {interviewType}

Difficulty Level: {difficulty}

Interview Duration: {duration}

📝 Your task:

Analyze the skills and role to identify key responsibilities, required knowledge, and expected experience.

Generate a list of interview questions depending on the interview duration and difficulty level.

Ensure the number and depth of questions is well balanced with the time provided.

Ensure the tone and structure match a real-life {interviewType} interview.

🧩 Format your response as a valid JSON with this shape:
interviewQuestions=[
  {{
    "question": "Your question here",
    "type": "type of the interview questions"
}},
  ...
]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {jobTitle} role.`;
