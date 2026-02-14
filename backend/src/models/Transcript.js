import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const TranscriptModel = mongoose.model("Transcript", transcriptSchema);
