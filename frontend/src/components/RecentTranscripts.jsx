import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchRecentTranscripts } from "../api/transcript.js";

const RecentTranscripts = () => {
  const [transcriptHistory, setTranscriptHistory] = useState([]);

 useEffect(() => {
  const fetchTranscriptHistory = async () => {
    try {
      const res = await fetchRecentTranscripts();
      console.log("dhuihaiusjaio",res)
      setTranscriptHistory(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch recent transcripts", error);
      alert("Failed to fetch recent transcripts");
    }
  };

  fetchTranscriptHistory(); 
}, []); 


  return (
    <div className="max-w-3xl mx-auto py-10 flex flex-col gap-6">
      <h1 className="font-bold text-2xl font-mono text-center">
        TRANSCRIPT HISTORY
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {transcriptHistory.map((t) => (
          <div
            key={t._id}
            className="bg-white shadow-md p-4 rounded-xl border border-gray-200 cursor-pointer"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-[#082567] font-bold">
                <Clock size={18} />
                <span className="text-sm">{t.createdAt.slice(0, 10)}</span>
              </div>
            </div>
            <h2 className="font-semibold text-lg">{t.text}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTranscripts;
