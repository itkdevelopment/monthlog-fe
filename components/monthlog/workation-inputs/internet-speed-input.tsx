"use client"

interface InternetSpeedInputProps {
  onSpeedChange: (speed: string) => void
  inputSpeed: string
  onSatisfactionChange: (score: number | null) => void
  satisfactionScore: number | null
}

export default function InternetSpeedInput({
  onSpeedChange,
  inputSpeed,
  onSatisfactionChange,
  satisfactionScore,
}: InternetSpeedInputProps) {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">와이파이 속도 만족도</h3>
        <p className="text-sm text-gray-600 mb-6">와이파이 속도에 대한 만족도를 1~10점으로 평가해주세요</p>

        <div className="space-y-3">
          <div className="grid grid-cols-10 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => onSatisfactionChange(score)}
                className={`aspect-square rounded-lg font-semibold text-lg transition-colors ${
                  satisfactionScore === score ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {score}
              </button>
            ))}
          </div>
          {satisfactionScore && <p className="text-sm text-blue-600 font-medium">선택한 점수: {satisfactionScore}점</p>}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">와이파이 속도</h3>
        <p className="text-sm text-gray-600 mb-6">측정한 인터넷 속도를 Mbps 단위로 입력해주세요</p>

        <div className="flex space-x-3">
          <input
            type="number"
            value={inputSpeed}
            onChange={(e) => onSpeedChange(e.target.value)}
            placeholder="속도를 입력하세요"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <span className="flex items-center px-3 text-gray-600 text-lg">Mbps</span>
        </div>

        {inputSpeed && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              입력한 속도: <strong>{inputSpeed}Mbps</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
