import React from "react";
import { Clock } from "lucide-react";

const RecentTranscripts = () => {
  const transcriptHistory = [
    { id: 1, title: "Strategy Sync: Global Expansion", time: "3h ago" },
    { id: 2, title: "Internal Workshop: Security Protocols", time: "Oct 15" },
    { id: 3, title: "Marketing Planning Session", time: "Oct 12" },
    { id: 4, title: "Product Launch Review", time: "Oct 10" },
    { id: 5, title: "Quarterly Team Retrospective", time: "Oct 8" },
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 flex flex-col gap-6">
      <h1 className="font-bold text-2xl font-mono text-center">
        TRANSCRIPT HISTORY
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {transcriptHistory.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow-md p-4 rounded-xl border border-gray-200 cursor-pointer"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-[#082567] font-bold">
                <Clock size={18} />
                <span className="text-sm">{t.time}</span>
              </div>
              
            </div>

            {/* Title */}
            <h2 className="font-semibold text-lg">{t.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTranscripts;
