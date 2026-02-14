import {
  extractFromTranscriptService,
  createActionItemService,
  getAllActionItemsService,
  getActionItemByIdService,
  updateActionItemService,
  deleteActionItemService
} from "../services/actionItemService.js";

export const extractFromTranscript = async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res
        .status(400)
        .json({ success: false, message: "Transcript is required" });
    }

    const result = await extractFromTranscriptService(transcript);

    res.status(200).json({
      success: true,
      message: "Action Items Extracted",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to extract action item" });
  }
};

export const createActionItem = async (req, res) => {
  try {
    const { task, owner, dueDate } = req.body;

    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Task is required" });
    }

    const result = await createActionItemService(task, owner, dueDate);

    res.status(201).json({
      success: true,
      message: "Action item created successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create action item" });
  }
};

export const getAllActionItems = async (req, res) => {
  try {
    const items = await getAllActionItemsService();
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch action items" });
  }
};

export const getActionItemById = async (req, res) => {
  try {
    const item = await getActionItemByIdService(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Action item not found" });

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const updateActionItem = async (req, res) => {
  try {
    const item = await updateActionItemService(req.params.id, req.body);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Action item not found" });

    res.status(200).json({
      success: true,
      message: "Action item updated successfully",
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update action item",
    });
  }
};

export const deleteActionItem = async (req, res) => {
  try {
    const item = await deleteActionItemService(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Action Item not found" });

    res.status(200).json({
      success: true,
      message: "Action item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete action item",
    });
  }
};
