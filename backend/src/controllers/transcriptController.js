import {getRecentTranscriptsService} from '../services/transcriptService.js'

export const getRecentTranscripts = async (req, res) => {
  try {
    const transcripts = await getRecentTranscriptsService();
    res.status(200).json({ success: true, data: transcripts });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Failed to fetch transcript history",
    });
  }
};
