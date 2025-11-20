'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-provider';
import { useToast } from '@/lib/toast-provider';
import { submitTestToDatabase } from '@/lib/database';
import Loading from '@/components/Loading';

const TEST_DATA = {easy:[{answer:1},{answer:1},{answer:1},{answer:1},{answer:1},{answer:1},{answer:0},{answer:1},{answer:0},{answer:1},{answer:3},{answer:1},{answer:2},{answer:0},{answer:1}], medium:[{answer:0},{answer:1},{answer:1},{answer:0},{answer:0},{answer:0},{answer:1},{answer:1},{answer:0},{answer:0},{answer:0},{answer:1},{answer:2},{answer:0},{answer:2}], hard:[{answer:0},{answer:0},{answer:0},{answer:0},{answer:1},{answer:0},{answer:0},{answer:2},{answer:0},{answer:0},{answer:0},{answer:0},{answer:0},{answer:2},{answer:0}]};


// Mock questions for score calculation
import { testData } from '@/lib/testData';
function WATPageContent() {
  const [watText, setWatText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [level, setLevel] = useState('easy');
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [hasUnansweredQuestions, setHasUnansweredQuestions] = useState(true);
  
  const { user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const levelParam = searchParams.get('level') || 'easy';
      const answersStr = searchParams.get('answers');
      const parsedAnswers = answersStr ? JSON.parse(decodeURIComponent(answersStr)) : [];
      const questions = testData[levelParam]?.questions || testData.easy?.questions || [];
      
      setLevel(levelParam);
      setAnswers(parsedAnswers);
      setQuestions(questions);
      setHasUnansweredQuestions(parsedAnswers.length !== 15);
      
      console.log('WAT loaded:', {level: levelParam, answersCount: parsedAnswers.length, questionsCount: questions.length});
    }
  }, [mounted, searchParams]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
  }, [user, router]);

  if (!mounted) return <Loading />;
  if (!user) return null;

  const wordCount = watText.trim().split(/\s+/).filter(word => word.length > 0).length;

  const calculateMCQScore = () => {
    console.log('TEST_DATA:', TEST_DATA);
    console.log('level:', level);
    const questions = TEST_DATA[level as keyof typeof TEST_DATA];
    console.log('Questions loaded:', questions);
    const mcqScore = answers.reduce((total, userAnswer, index) => {
      return total + (parseInt(userAnswer) === questions[index]?.answer ? 1 : 0);
    }, 0);
    console.log('Final calculated score:', mcqScore, 'out of', questions.length);
    return mcqScore;
  };

  const handleSubmit = async () => {
    // Validation at start
    if (!user) {
      alert('User not found');
      return;
    }
    
    if (!watText || watText.trim().length === 0) {
      alert('Please write your WAT response');
      return;
    }
    
    if (answers.length !== 15) {
      alert('Please complete all MCQ questions');
      return;
    }
    
    console.log('Submit validation passed:', {
      user,
      level,
      mcqScore: calculateMCQScore(),
      watLength: watText.length
    });

    if (wordCount < 50) {
      showToast('Please write at least 50 words for your response.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate MCQ score using TEST_DATA with detailed logging
      console.log('🔢 SCORE CALCULATION START');
      const questions = TEST_DATA?.[level] || [];
      let mcqScore = 0;
      for (let i = 0; i < answers.length; i++) {
        const answerLetter = String(answers[i]).toLowerCase();
        const answerIndex = answerLetter.charCodeAt(0) - 97;
        const correctIndex = questions[i]?.answer;
        const match = answerIndex === correctIndex;
        console.log(`Q${i+1}: '${answerLetter}'→${answerIndex} vs ${correctIndex} ${match ? '✅' : '❌'}`);
        if (match) mcqScore++;
      }
      console.log('✅ SCORE:', mcqScore, '/', questions.length);
      console.log('🔢 === SCORE CALCULATION END ===');

      // Call OpenAI API and submit to database
      try {
        const evalRes = await fetch('/api/evaluate-wat', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({watText, testCategory:level})});
        if (!evalRes.ok) throw new Error('API failed');
        const evalJson = await evalRes.json();
        let watEvaluation = evalJson.evaluation || 'No evaluation';
        console.log('Got eval:', watEvaluation.substring(0,50));
        
        // Pre-DB validation and logging
        console.log('Pre-DB user:', user);
        console.log('Pre-DB level:', level);
        console.log('Pre-DB mcqScore:', mcqScore);
        console.log('Pre-DB watText:', watText?.substring(0,100));
        console.log('Pre-DB watEvaluation:', watEvaluation?.substring(0,100));
        if (!watText) {alert('WAT text is missing!'); return;}
        if (!watEvaluation) watEvaluation = 'No evaluation received';
console.log('Final DB params:', {username: user?.username || user, level, mcqScore, wtLen: watText?.length, weLen: watEvaluation?.length});
console.log('Calling DB now with validated params');
        
        const username = (typeof user === 'string' ? user : user?.username) || '';
        console.log('📤 Sending to database:', { username, level, score: mcqScore, watLength: watText?.length });
        const dbRes = await submitTestToDatabase({
          username,
          testCategory: level,
          testScore: mcqScore,
          watText,
          watEvaluation
        });
        if (dbRes.success) {showToast('Test submitted successfully!', 'success'); router.push('/scores');}
      } catch(e) {console.error(e); alert('Failed: '+(e instanceof Error ? e.message : 'Unknown error'));}
    } catch (error) {
      console.error('Submission error:', error);
      showToast('Failed to submit test. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length <= 500) {
      setWatText(text);
      console.log('WAT text state:', text, 'Length:', text?.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Writing Assessment Task</h1>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
              {level.charAt(0).toUpperCase() + level.slice(1)} Level
            </div>
          </div>

          {/* WAT Prompt */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Prompt:</h2>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
              <p className="text-gray-700">Write a comprehensive response to the given topic. Express your thoughts clearly and support your arguments with relevant examples.</p>
            </div>

          {/* Instructions */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Instructions:</span> Max 500 words · Minimum suggested: 150 words
            </p>
          </div>

          {/* Textarea */}
          <div className="mb-4">
            <textarea
              value={watText}
              onChange={handleTextChange}
              placeholder="Write your response here..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
              style={{ minHeight: '220px' }}
            />
          </div>

          {/* Word Counter */}
          <div className="flex justify-between items-center mb-6">
            <div className={`text-sm ${wordCount > 500 ? 'text-red-600' : 'text-gray-600'}`}>
              Words: {wordCount}/500
            </div>
            {wordCount < 150 && (
              <div className="text-sm text-orange-600">
                Suggested minimum: 150 words
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => router.push(`/assessment/test?level=${level}`)}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              Back to Test
            </button>
            <button
              onClick={handleSubmit}
              disabled={hasUnansweredQuestions || isSubmitting || wordCount === 0}
              className={`px-6 py-3 rounded-lg transition-colors ${
                hasUnansweredQuestions || isSubmitting || wordCount === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Test'}
            </button>
          </div>
        </div>
      </div>

    </div>
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <Loading />
            <p className="text-center mt-4 text-gray-700">Evaluating your response...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WATPage() {
  return (
    <Suspense fallback={<Loading />}>
      <WATPageContent />
    </Suspense>
  );
}
