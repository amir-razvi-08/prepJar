export interface AverageFeedback {
    averageTechnicalKnowledge: number | undefined;
    averageCommunicationAndClarity: number | undefined;
    averageFluencyAndFlow: number | undefined;
    averageProblemSolvingSkills: number | undefined;
    averageConfidenceAndDelivery: number | undefined;
    averageOverallScore: number | undefined;
}

export interface LatestInterview {
    _id: string;
    user: string;
    jobTitle: string;
    technicalSkills: string[];
    interviewTitle: string;
}

export interface TitleBreakdownItem {
    titleBreakdown: {
        [key: string]: {
            _id: string;
            count: number;
        };
    };
}

export interface TotalSessionItem {
    total: number;
}

export interface InterviewSessionData {
    credits: number;
    latestInterviews: LatestInterview[];
    titleBreakdown: TitleBreakdownItem[];
    totalSessions: TotalSessionItem[];
}
