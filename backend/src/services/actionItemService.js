import { extractActionItems } from "../ai/extractActionItems.js";
import { ActionItemModel } from "../models/ActionItem.js";
import { TranscriptModel } from "../models/Transcript.js";

// Extract from transcript
export const extractFromTranscriptService = async (transcript) => {
  const savedTranscript = await TranscriptModel.create({ text: transcript });

  const items = await extractActionItems(transcript);

  const savedItems = await ActionItemModel.insertMany(
    items.map((item) => ({ ...item, transcriptId: savedTranscript._id })),
  );
  return { savedTranscript, actionItems: savedItems };
};
// Create manually
export const createActionItemService = async (task, owner, dueDate) => {
  const existingActionItem = await ActionItemModel.findOne({ task, owner, dueDate });

   if (existingActionItem) {
    const error = new Error("Action item already exists");
    error.statusCode = 409;
    throw error;
  }

  const savedItems = await ActionItemModel.create({ task, owner, dueDate });
  return savedItems 
};

// GET ALL
export const getAllActionItemsService = async () => {
  return await ActionItemModel.find().sort({ createdAt: -1 });
};

// GET BY ID
export const getActionItemByIdService = async (id) => {
  return await ActionItemModel.findById(id);
};

// UPDATE
export const updateActionItemService = async (id, data) => {
  return await ActionItemModel.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
export const deleteActionItemService = async (id) => {
  return await ActionItemModel.findByIdAndDelete(id);
};
