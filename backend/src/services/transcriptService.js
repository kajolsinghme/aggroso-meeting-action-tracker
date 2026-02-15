import { TranscriptModel } from "../models/Transcript.js"

export const getRecentTranscriptsService = async() => {
    const transcripts = await TranscriptModel.find().sort({createdAt: -1}).limit(5)
    return transcripts
}