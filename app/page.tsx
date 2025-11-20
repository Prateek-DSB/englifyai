'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Englify<span className="text-yellow-300">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Master English with AI-powered assessments designed for Indian graduates. 
            Test your skills and get personalized feedback.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Assessment</h3>
            <p className="text-white/80 text-sm">AI-powered evaluation of your English proficiency</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-white mb-2">Detailed Analytics</h3>
            <p className="text-white/80 text-sm">Get comprehensive feedback on your performance</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-lg font-semibold text-white mb-2">Career Ready</h3>
            <p className="text-white/80 text-sm">Prepare for interviews and professional communication</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Link 
            href="/login"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Assessment
          </Link>
          <p className="text-white/70 text-sm">
            Free assessment • No registration required • Instant results
          </p>
        </div>
      </div>
    </div>
  );
}
