import { NextRequest, NextResponse } from 'next/server'
import Score from '@/models/Score'
import { connectDB } from '@/lib/mongoose'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const {
      user: { sid, name },
      score,
      winStreak,
    } = await req.json()

    let existingUser = await Score.findOne({ userId: sid })
    if (!existingUser) {
      existingUser = new Score({
        userId: sid,
        name: name,
        score,
        winStreak,
      })
    } else {
      existingUser.name = name
      existingUser.score = score
      existingUser.winStreak = winStreak
    }

    await existingUser.save()
    return NextResponse.json(existingUser)
  } catch (error) {
    console.error(error)
  }
}

export async function GET() {
  await connectDB()

  const scores = await Score.find({})
  return NextResponse.json(scores)
}
