import { TestSubmission } from '@/types';

export interface SubmitTestParams {
  Username: string;
  testCategory: string;
  testScore: number;
  watText: string;
  watEvaluation: string;
}

// Mock database using localStorage for development
export async function submitTestToDatabase({
  Username,
  testCategory,
  testScore,
  watText,
  watEvaluation
}: SubmitTestParams): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Submitting test to mock database:', {
      Username,
      testCategory,
      testScore,
      watTextLength: watText.length,
      watEvaluationLength: watEvaluation.length
    });

    if (typeof window === 'undefined') {
      return { success: false, error: 'localStorage not available on server' };
    }

    // Create test submission object
    const submission: TestSubmission = {
      id: Date.now(), // Simple ID generation
      Username,
      'Test Category': testCategory,
      'Test score': testScore,
      WAT: `${watText}\n\n--- EVALUATION ---\n${watEvaluation}`,
      time_stamp: new Date().toISOString()
    };

    // Get existing submissions
    const existingData = localStorage.getItem('test_submissions');
    const submissions: TestSubmission[] = existingData ? JSON.parse(existingData) : [];

    // Add new submission
    submissions.push(submission);

    // Save back to localStorage
    localStorage.setItem('test_submissions', JSON.stringify(submissions));

    console.log('Test submitted successfully to mock database');
    return { success: true };
  } catch (error) {
    console.error('Mock database error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function getUserTestHistory(username: string) {
  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'localStorage not available on server', data: [] };
    }

    const existingData = localStorage.getItem('test_submissions');
    const submissions: TestSubmission[] = existingData ? JSON.parse(existingData) : [];

    // Filter by username and sort by timestamp (newest first)
    const userSubmissions = submissions
      .filter(sub => sub.Username === username)
      .sort((a, b) => new Date(b.time_stamp!).getTime() - new Date(a.time_stamp!).getTime());

    return { success: true, data: userSubmissions };
  } catch (error) {
    console.error('Error fetching test history from mock database:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      data: []
    };
  }
}
