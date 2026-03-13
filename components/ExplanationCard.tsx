interface ExplanationCardProps {
  topic: string
  explanation: string
}

export default function ExplanationCard({ topic, explanation }: ExplanationCardProps) {
  return (
    <div className="w-full mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-blue-600 px-6 py-4">
        <p className="text-xs font-medium text-blue-200 uppercase tracking-wider mb-1">Topic</p>
        <h2 className="text-xl font-semibold text-white capitalize">{topic}</h2>
      </div>
      <div className="px-6 py-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Explanation</p>
        <p className="text-gray-700 leading-relaxed text-base">{explanation}</p>
      </div>
    </div>
  )
}
