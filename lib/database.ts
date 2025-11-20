import { createClient } from '@supabase/supabase-js';
import type { SubmitTestParams } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);


export async function submitTestToDatabase({
  username,
  testCategory,
  testScore,
  watText,
  watEvaluation
}: SubmitTestParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Parameter validation
    if (!watText) watText = '';
    if (!watEvaluation) watEvaluation = 'No evaluation provided';
    const watLength = watText?.length || 0;
    
    console.log('DB params validated:', {
      username,
      testCategory,
      testScore,
      watLength,
      evalLength: watEvaluation?.length || 0
    });


    console.log('Testing Supabase connection...');
    try {
      const {data: connTest, error: connError} = await supabase.from('test_submission').select('count');
      console.log('Connection test result:', {hasData: !!connTest, hasError: !!connError, errorMsg: connError?.message});
      if (connError) {
        console.error('Connection test failed:', connError);
        return {success: false, error: 'Database connection failed'};
      }
    } catch (e) {
      console.error('Connection test exception:', e);
    }
    console.log('Submitting test to database:', {
      username,
      testCategory,
      testScore,
      watTextLength: watLength,
      watEvaluationLength: watEvaluation?.length || 0
    });

    console.log('=== SUBMISSION PARAMETERS ===');
    console.log('username:', username, 'type:', typeof username);
    console.log('testCategory:', testCategory, 'type:', typeof testCategory);
    console.log('testScore:', testScore, 'type:', typeof testScore);
    console.log('watText length:', watText?.length, 'type:', typeof watText);
    console.log('watEvaluation length:', watEvaluation?.length, 'type:', typeof watEvaluation);
    console.log('=== END PARAMETERS ===');

    const scoreInt = parseInt(String(testScore), 10) || 0;
    const { data, error } = await supabase
      .from('test_submission')
      .insert({
        Username: username,
        'Test Category': testCategory,
        'Test score': scoreInt,
        WAT: watEvaluation,
        time_stamp: new Date().toISOString()
      });

    if (!error) console.log('=== SUCCESS ===', data);

    if (error) {
      console.error('=== DATABASE ERROR DETAILS ===');
      console.error('Error message:', error?.message);
      console.error('Error code:', error?.code);
      console.error('Error details:', error?.details);
      console.error('Error hint:', error?.hint);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      console.error('=== END ERROR ===');
      return { success: false, error: error.message };
    }

    console.log('Test submitted successfully:', data);
    return { success: true };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function getUserTestHistory(username: string) {
  try {
    const { data, error } = await supabase
      .from('test_submission')
      .select('*')
      .eq('username', username)
      .order('time_stamp', { ascending: false });

    if (error) {
      console.error('Error fetching test history:', error);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching test history:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      data: []
    };
  }
}
