export interface QuestionItem {
  question: string;
  type: string;
}

export interface IinterviewData {
  _id: string;
  user: string;
  jobTitle: string;
  technicalSkills: string[];
  interviewTitle: string;
  interviewType: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  duration: number;
  questionList: QuestionItem[];
  createdAt: string; // Use Date if parsed
  __v: number;
}
