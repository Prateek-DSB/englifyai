'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-provider';
import { getTestQuestions } from '@/lib/testData';
import { TestQuestion } from '@/types';
import Loading from '@/components/Loading';
function TestPageContent() {
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get('level') || 'easy';

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    const testQuestions = getTestQuestions(level as 'easy' | 'medium' | 'hard');
    setQuestions(testQuestions);
    setAnswers(new Array(testQuestions.length).fill(''));
  }, [user, level, router]);

  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion] || '');
  }, [currentQuestion, answers]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to WAT with answers
      const answersParam = encodeURIComponent(JSON.stringify(answers));
      router.push(`/assessment/wat?level=${level}&answers=${answersParam}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isLoading || !user) return <Loading />;
  if (questions.length === 0) return <Loading />;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Top Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {level}
            </span>
            <span className="text-lg font-semibold">
              Q {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>
          
          <div className="space-y-3">
            {Object.entries(currentQ.options).map(([optionLetter, optionText], index) => {
              const isSelected = selectedAnswer === optionLetter;
              
              return (
                <button
                  key={optionLetter}
                  onClick={() => handleAnswerSelect(optionLetter)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="font-medium">{optionLetter.toUpperCase()})</span> {optionText}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentQuestion === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
          >
            {currentQuestion === questions.length - 1 ? 'Continue to WAT' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TestPageContent />
    </Suspense>
  );
}
