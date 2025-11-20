'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-provider';
import Loading from '@/components/Loading';

export default function AssessmentPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [user, isLoading, router]);

  if (isLoading) return <Loading />;
  if (!user) return null;

  const difficulties = [
    { id: 'easy', label: 'Easy', description: 'Basic level questions' },
    { id: 'medium', label: 'Medium', description: 'Intermediate level questions' },
    { id: 'hard', label: 'Hard', description: 'Advanced level questions' }
  ];

  const handleProceed = () => {
    if (selectedDifficulty) {
      router.push(`/assessment/test?level=${selectedDifficulty}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 p-4">
      <div className="max-w-4xl mx-auto pt-16">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Difficulty</h1>
            <p className="text-gray-600">Select your preferred difficulty level for the assessment</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`px-6 py-4 rounded-full border-2 transition-all duration-200 ${
                  selectedDifficulty === difficulty.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{difficulty.label}</div>
                  <div className="text-sm opacity-80">{difficulty.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/home')}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={handleProceed}
              disabled={!selectedDifficulty}
              className={`px-6 py-3 rounded-lg transition-colors ${
                selectedDifficulty
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed to Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
