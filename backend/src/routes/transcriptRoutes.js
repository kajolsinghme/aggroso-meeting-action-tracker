import express from "express";
import {
  getRecentTranscripts
} from "../controllers/transcriptController.js";


const router = express.Router();

router.get("/recent", getRecentTranscripts);


export default router;
