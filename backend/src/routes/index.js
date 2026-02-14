import express from "express";
import actionItemsRoutes from "./actionItemRoutes.js"
import transcriptRoutes from './transcriptRoutes.js'

const router = express.Router();

router.use("/action-items", actionItemsRoutes);
router.use('/transcripts', transcriptRoutes)

export default router;
