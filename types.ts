
export interface Question {
  id: string;
  text: string;
  options: string[];
}

export interface Answers {
  [questionId: string]: string;
}

export interface Recommendation {
  productName: string;
  reason: string;
  usage: string;
}

export interface XiaohongshuPost {
    id?: number;
    title: string;
    body: string;
    tags: string;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  summary: string;
  xiaohongshuPost: XiaohongshuPost;
}