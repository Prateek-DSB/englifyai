export interface User {
  username: string;
}

export interface TestQuestion {
  id: number;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: 'a' | 'b' | 'c' | 'd';
}

export interface TestData {
  easy: TestQuestion[];
  medium: TestQuestion[];
  hard: TestQuestion[];
}

export interface TestSubmission {
  id: number;
  Username: string;
  'Test score': number;
  'Test Category': string;
  time_stamp: string;
  WAT: string;
}

export interface WATPrompt {
  easy: string;
  medium: string;
  hard: string;
}
export interface SubmitTestParams {
  username: string;
  testCategory: string;
  testScore: number;
  watText: string;
  watEvaluation: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
