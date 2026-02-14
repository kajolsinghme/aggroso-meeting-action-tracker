import express from "express";
import {
  extractFromTranscript,
  createActionItem,
  getAllActionItems,
  getActionItemById,
  updateActionItem,
  deleteActionItem,
} from "../controllers/actionItemController.js";


const router = express.Router();

router.post("/extract", extractFromTranscript);
router.post("/", createActionItem);
router.get("/", getAllActionItems);
router.get("/:id", getActionItemById);
router.patch("/:id", updateActionItem);
router.delete("/:id", deleteActionItem);

export default router;
