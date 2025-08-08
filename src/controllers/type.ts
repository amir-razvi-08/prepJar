export interface InterviewFormInput {
  jobTitle: string;
  technicalSkills: string[];
  interviewTitle:string,
  interviewType: string[];
  difficulty: string;
  duration: string;
  userEmail:string;
}

export interface FeedbackConversation{
  transcript:any,
  interviewId:string,
  userId:string,
}