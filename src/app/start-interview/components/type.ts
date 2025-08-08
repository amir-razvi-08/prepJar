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
  createdAt: string;
  __v: number;
}


export interface ConversationMessage {
  role: "user" | "ai" | "system"|"assistant";
  content: string;
}

export interface IvapiMessage {
  conversation: ConversationMessage[];
}
