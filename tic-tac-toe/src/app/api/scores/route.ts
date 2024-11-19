import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Score from '@/models/Score'

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return
  await mongoose.connect(process.env.MONGODB_URI!)
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const {
      user: { sid, name },
      score,
      winStreak,
    } = await req.json()

    console.log(name)

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
