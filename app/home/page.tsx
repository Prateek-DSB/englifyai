'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-provider';
import Loading from '@/components/Loading';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, router, isLoading]);

  if (isLoading || !user) return <Loading />;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome back, {typeof user === 'object' ? user.username : user}!
          </h1>
          <p className="text-lg text-gray-600">
            Ready to improve your English skills? Choose an option below to get started.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => router.push('/assessment')}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-3xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-2">Take Assessment</h2>
              <p className="text-indigo-100">
                Test your English skills with our comprehensive assessment
              </p>
            </div>
          </button>

          <button
            onClick={() => router.push('/scores')}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-3xl mb-4">📊</div>
              <h2 className="text-2xl font-bold mb-2">View Scores</h2>
              <p className="text-emerald-100">
                Check your progress and previous test results
              </p>
            </div>
          </button>
        </div>

        {/* Tip of the Day */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            Tip of the Day
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Practice reading English articles daily to improve your vocabulary and comprehension. 
            Focus on understanding context clues to deduce the meaning of unfamiliar words.
          </p>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              sessionStorage.removeItem('username');
              router.push('/login');
            }}
            className="text-gray-600 hover:text-gray-800 underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
