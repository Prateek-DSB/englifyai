'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-provider';
import { supabase } from '@/lib/supabase';
import Loading from '@/components/Loading';
import { TestSubmission } from '@/types';
const formatDate = (ts: any) => { if (!ts) return 'N/A'; return new Date(ts).toISOString().replace('T', ' ').substring(0, 19); };

export default function ScoresPage() {

  const [submissions, setSubmissions] = useState<TestSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvaluation, setExpandedEvaluation] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchSubmissions = async () => {
      try {
        const username = user?.username || user?.Username || user;
        console.log('Fetch username:', username);
        const {data, error} = await supabase
          .from('test_submission')
          .select('id, Username, "Test score", "Test Category", time_stamp, WAT')
          .eq('Username', username);
        
        console.log('Query result:', {success: !error, records: data?.length, errorCode: error?.code});
        
        if (error) {
          console.error('Supabase error:', error.message, error.hint);
          setSubmissions([]);
          return;
        }
        
        const sorted = (data || []).sort((a,b) => new Date(b.time_stamp || 0) - new Date(a.time_stamp || 0));
        setSubmissions(sorted);
        console.log('✅ Loaded', sorted.length, 'submissions');
      } catch (err) {
        console.error('Catch block:', err);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [user, router]);

  if (!mounted) return <div>Loading...</div>;
  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const formatDate = (ts: any) => {
    if (!ts) return 'N/A';
    return new Date(ts).toISOString().replace('T', ' ').substring(0, 19);
  };

  const getWordCount = (text: string | null | undefined) => {
    if (!text || typeof text !== 'string') return 0;
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  };

  const getDifficultyColor = (cat: string) => {
    if (!cat) return 'bg-gray-100';
    switch(cat.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Scores</h1>
            <p className="text-gray-600">Your assessment history and results</p>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No tests taken yet</div>
              <p className="text-gray-400 mb-6">Take your first assessment to see results here</p>
              <button
                onClick={() => router.push('/assessment')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Take New Test
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {submissions.map((submission) => {
                  // Safe variable extraction
                  const category = submission['Test Category'] || 'easy';
                  const testScore = submission['Test score'] || 0;
                  const evaluation = submission.WAT || '';
                  const date = formatDate(submission.time_stamp);
                  
                  console.log('Displaying submission:', {id: submission.id, score: submission['Test score']});
                  
                  return (
                  <div key={submission.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(category)}`}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {submission.time_stamp ? formatDate(submission.time_stamp) : 'N/A'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">MCQ Score:</span>
                        <span className="font-bold text-indigo-600">{testScore}/15</span>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">AI Evaluation</h4>
                        {evaluation ? (
                          <pre style={{whiteSpace:'pre-wrap', fontSize:'14px', backgroundColor:'#f8f9fa', padding:'12px', borderRadius:'6px', border:'1px solid #e9ecef'}}>{evaluation}</pre>
                        ) : (
                          <p className="text-gray-500 italic">No evaluation available</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/home')}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => router.push('/assessment')}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Take New Test
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
