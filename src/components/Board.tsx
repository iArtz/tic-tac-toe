'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect, useState } from 'react'

const Board = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [score, setScore] = useState(0)
  const [winStreak, setWinStreak] = useState(0)
  const [isAI, setIsAI] = useState(true)
  const { user, isLoading, error } = useUser()
  const [loading, setLoading] = useState(true)

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board) || isBoardFull(board)) return
    const newBoard = board.slice()
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  const aiMove = (newBoard) => findBestMove(newBoard)
  const randomMove = (newBoard) => {
    const emptyIndices = newBoard
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null)
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
  }

  const botMove = (newBoard: (string | null)[]) => {
    if (calculateWinner(newBoard) || isBoardFull(newBoard)) return
    const move = isAI ? aiMove(newBoard) : randomMove(newBoard)
    newBoard[move] = 'O'
    setBoard(newBoard)
    setIsXNext(true)
  }

  const findBestMove = (board: (string | null)[]) => {
    let bestVal = -Infinity
    let bestMove = -1
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O'
        const moveVal = minimax(board, 0, false)
        board[i] = null
        if (moveVal > bestVal) {
          bestMove = i
          bestVal = moveVal
        }
      }
    }
    return bestMove
  }

  const minimax = (board: (string | null)[], depth: number, isMax: boolean) => {
    const score = evaluate(board)
    if (score === 10) return score - depth
    if (score === -10) return score + depth
    if (isBoardFull(board)) return 0

    if (isMax) {
      let best = -Infinity
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O'
          best = Math.max(best, minimax(board, depth + 1, !isMax))
          board[i] = null
        }
      }
      return best
    } else {
      let best = Infinity
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X'
          best = Math.min(best, minimax(board, depth + 1, !isMax))
          board[i] = null
        }
      }
      return best
    }
  }

  const evaluate = (board: (string | null)[]) => {
    const winner = calculateWinner(board)
    if (winner === 'O') return 10
    if (winner === 'X') return -10
    return 0
  }

  useEffect(() => {
    if (!isXNext && !calculateWinner(board) && !isBoardFull(board)) {
      const timer = setTimeout(() => botMove(board.slice()), 300)
      return () => clearTimeout(timer)
    }
  }, [isXNext, board])

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const isBoardFull = (squares: (string | null)[]) =>
    squares.every((square) => square !== null)

  const saveHandler = async () => {
    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, score, winStreak }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      console.error('Error saving score to database:', error)
    }
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setShowModal(false)
    saveHandler()
  }

  const updateScore = () => {
    switch (winner) {
      case 'X':
        if (winStreak != 0 && winStreak % 3 === 0) {
          setScore((prev) => prev + 1)
          setWinStreak(0)
        }
        setScore((prev) => prev + 1)
        setWinStreak((prev) => prev + 1)
        break
      case 'O':
        setScore((prev) => {
          if (prev <= 0) {
            return 0
          }
          return prev - 1
        })
        setWinStreak(0)
    }
  }

  const winner = calculateWinner(board)
  const isFull = isBoardFull(board)
  const status = winner
    ? `Winner: ${winner}`
    : isFull
    ? 'Tie'
    : `Next player: ${isXNext ? 'X' : 'O'}`

  useEffect(() => {
    if ((isFull && !winner) || winner) {
      updateScore()
      setShowModal(true)
    }
  }, [isFull, winner])

  useEffect(() => {
    const fetchScore = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/scores/${user.sid}`)
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const data = await response.json()
          setScore(data.score)
          setWinStreak(data.winStreak)
        } catch (error) {
          console.error('Error fetching score from database:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchScore()
  }, [])

  if (loading || isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      <div className="pb-6 text-4xl">Player score {score}</div>
      <div className="pb-6 text-3xl">Winning streak {winStreak}</div>
      <div className="pb-6 text-2xl">{status}</div>
      <div className="grid grid-cols-3 gap-2" id="board">
        {board.map((value, index) => (
          <button
            disabled={!isXNext}
            key={index}
            onClick={() => handleClick(index)}
            className={`w-32 h-32 text-8xl ${
              value === 'X' ? 'bg-green-500' : value === 'O' ? 'bg-red-500' : ''
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="pt-8">
        {isAI ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsAI(false)}
          >
            Play with Bot
          </button>
        ) : (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsAI(true)}
          >
            Play with AI
          </button>
        )}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <div className="text-center text-2xl pb-6 text-black">
              {winner == 'X' ? 'You Won' : winner == 'O' ? 'You Lose' : 'Tie'}
            </div>
            <button
              onClick={restartGame}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Board
