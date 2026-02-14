import mongoose from "mongoose";

const actionItemSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    owner: {
      type: String,

    },
    dueDate: {
      type: String,

    },
     status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    transcriptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transcript",
    },
  },
  { timestamps: true },
);

export const ActionItemModel = mongoose.model(
  "ActionItem",
  actionItemSchema,
);
