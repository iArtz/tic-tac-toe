'use client'
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

interface Score {
  userId: string
  name: string
  score: number
  winStreak: number
}

const ScoresPage = () => {
  const [scores, setScores] = useState<Score[]>([])
  const [loading, setLoading] = useState(true)
  const { user, isLoading, error } = useUser()

  useEffect(() => {
    const fetchScores = async () => {
      const response = await fetch('/api/scores')
      const data = await response.json()
      setScores(data)
      setLoading(false)
    }

    fetchScores()
  }, [])

  if (error) {
    return <div>Error...</div>
  }

  if (user) {
    return (
      <>
        <h1 className="text-center text-4xl font-bold py-14">Scoreboard</h1>
        <div className="flex flex-col items-center justify-center py-15">
          {isLoading || (loading && <div>Loading...</div>)}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Wins Streak
                  </th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr key={score.userId} className="text-center">
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {score.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {score.score}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {score.winStreak}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }

  return <div>-</div>
}

export default ScoresPage
