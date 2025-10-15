export interface InterviewQuestion {
  question: string;
  type: string;
}

export interface QuestionItem {
  interviewQuestions: InterviewQuestion[];
}

export interface IinterviewData {
  _id: string;
  user: string;
  jobTitle: string;
  technicalSkills: string[];
  interviewTitle: string;
  interviewType: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  questionList: QuestionItem[];
  createdAt: string;
  __v: number;
}
