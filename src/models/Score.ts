import mongoose, { Schema, Document } from 'mongoose'

interface IScore extends Document {
  userId: string
  name: string
  score: number
  winStreak: number
}

const ScoreSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  winStreak: { type: Number, default: 0 },
})

export default mongoose.models.Score ||
  mongoose.model<IScore>('Score', ScoreSchema)
