'use client'

import { useState } from 'react'
import TopicInput from '@/components/TopicInput'
import ExplanationCard from '@/components/ExplanationCard'

export default function Home() {
  const [topic, setTopic] = useState('')
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submittedTopic, setSubmittedTopic] = useState('')

  const handleExplain = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to continue.')
      return
    }

    setError('')
    setExplanation('')
    setLoading(true)
    setSubmittedTopic(topic.trim())

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
      } else {
        setExplanation(data.explanation)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-5 shadow">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Study Explainer</h1>
          <p className="text-gray-500 text-base">Enter any study topic and get a simple, student-friendly explanation instantly.</p>
        </div>

        {/* Input */}
        <TopicInput
          topic={topic}
          setTopic={setTopic}
          onSubmit={handleExplain}
          loading={loading}
        />

        {/* Error */}
        {error && (
          <div className="mt-5 flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" style={{ borderWidth: '3px' }}></div>
            <p className="text-sm">Generating explanation...</p>
          </div>
        )}

        {/* Result */}
        {!loading && explanation && (
          <ExplanationCard topic={submittedTopic} explanation={explanation} />
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-16">Powered by Gemini AI · KALNET Internship Project</p>
      </div>
    </main>
  )
}
