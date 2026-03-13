'use client'

interface TopicInputProps {
  topic: string
  setTopic: (value: string) => void
  onSubmit: () => void
  loading: boolean
}

export default function TopicInput({ topic, setTopic, onSubmit, loading }: TopicInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) onSubmit()
  }

  const exampleTopics = ["Photosynthesis", "Newton's Laws", "Binary Search", "World War II"]

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a study topic (e.g. Photosynthesis)"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
          disabled={loading}
        />
        <button
          onClick={onSubmit}
          disabled={loading || !topic.trim()}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm whitespace-nowrap"
        >
          {loading ? 'Generating...' : 'Explain Topic'}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-400">Try:</span>
        {exampleTopics.map((t) => (
          <button
            key={t}
            onClick={() => { setTopic(t); }}
            disabled={loading}
            className="text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
