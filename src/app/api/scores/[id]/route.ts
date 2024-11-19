import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongoose'
import Score from '@/models/Score'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const id = (await params).id
    const scores = await Score.findOne({ userId: id })
    return NextResponse.json(scores)
  } catch (error) {
    console.error(error)
  }
}
