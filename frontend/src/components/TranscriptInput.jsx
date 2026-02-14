import React from "react";

const TranscriptInput = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 flex flex-col items-center justify-center gap-6">
      <h1 className="font-bold text-2xl font-mono ">
        TRANSCRIPT PROCESSOR
      </h1>

      <textarea
        className="w-full max-w-3xl h-40 p-6 rounded-2xl shadow-lg font-medium border border-gray-300 "
        placeholder="Paste your conversation transcript here... (e.g. Liam: 'I will finalize the security audit by next Tuesday.')"
      ></textarea>

      <div className="flex flex-row justify-between w-full max-w-3xl px-4 py-3 bg-gray-50 rounded-xl items-center gap-4">
        <button className="bg-white text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 cursor-pointer">
          Reset
        </button>

        <button className="bg-[#082567] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#0e3495] cursor-pointer">
          Analyse & Extract
        </button>
      </div>
    </div>
  );
};

export default TranscriptInput;
