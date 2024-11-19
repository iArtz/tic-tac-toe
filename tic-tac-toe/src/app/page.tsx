'use client'
import Nav from '../components/Nav'
import Board from '../components/Board'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home() {
  const { user } = useUser()
  return (
    <>
      <Nav />
      {user ? (
        <>
          <h1 className="text-center text-4xl font-bold py-14">Tic-Tac-Toe</h1>
          <div className="flex flex-col items-center justify-center py-15">
            <Board />
          </div>
        </>
      ) : (
        <div className="text-center text-2xl py-20">
          Please login to start playing game.
        </div>
      )}
    </>
  )
}
