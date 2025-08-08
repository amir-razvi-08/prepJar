interface InterviewItem {
  interviewTitle: string;
  feedbackId: string;
  technicalSkills: string[];
  createdAt: string;
}


export interface InterviewCardProps {
  latestInterviews: InterviewItem[];
}