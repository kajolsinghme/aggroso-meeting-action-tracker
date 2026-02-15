import { useState } from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import { extractActionItems, fetchAllTasks } from "../api/actionItems";
import { useEffect } from "react";

const TranscriptPage = () => {
  const [transcript, setTranscript] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetchAllTasks();
      console.log("response returned from fetch tasks API", res);

      const taskArray = res?.data?.data;

      setTasks(Array.isArray(taskArray) ? taskArray : []);
    } catch (error) {
      console.error("Failed to fetch the tasks", error);
      alert("Failed to fetch the tasks");
    }
  };

  const handleExtract = async () => {
    if (!transcript.trim()) return alert("Transcript is required");

    try {
      setLoading(true);
      await extractActionItems(transcript);
      console.log("extraction done");
      setTranscript("");
      await fetchTasks();
    } catch (error) {
      console.error("Extraction failed", error);
      alert("Extraction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTranscript("");
  };

  const handleCreateActionItem = async() => {
   
  }
  const handleUpdateStatus = (itemId) => {
    console.log("Mark complete:", itemId);
  };

  const handleUpdateACtionItem = (itemId) => {
    console.log("Edit task:", itemId);
  };

  const handleDeleteACtionItem = (itemId) => {
    console.log("Delete task:", itemId);
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-10 flex flex-col items-center gap-10">
      <div className="w-full flex flex-col items-center gap-6">
        <h1 className="font-bold text-2xl font-mono">TRANSCRIPT PROCESSOR</h1>

        <textarea
          className="w-full max-w-3xl h-40 p-6 rounded-2xl shadow-lg font-medium border border-gray-300"
          placeholder="Paste your conversation transcript here..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />

        <div className="flex justify-between w-full max-w-3xl px-4 py-3 bg-gray-50 rounded-xl items-center gap-4">
          <button
            className="bg-white text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-100"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            disabled={loading}
            className="bg-[#082567] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#0e3495]"
            onClick={handleExtract}
          >
            {loading ? "Extracting..." : "Analyse & Extract"}
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h1 className="font-bold text-2xl font-mono">ACTIONABLE TASKS</h1>
          <button onClick={handleCreateActionItem} className="bg-[#082567] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#0e3495]">
            Add Task
          </button>
        </div>

        {tasks.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md p-4 rounded-xl border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.task}</h2>
              <p className="text-gray-500 text-sm">
                Owner: {item.owner} | Due:{" "}
                {item.dueDate ? item.dueDate : "No deadline"}
              </p>
            </div>

            <div className="flex gap-3 text-gray-500">
              <Check
                size={18}
                className="cursor-pointer hover:text-green-600"
                onClick={handleUpdateStatus}
              />
              <Edit
                size={18}
                onClick={handleUpdateACtionItem}
                className="cursor-pointer hover:text-blue-600"
              />
              <Trash2
                size={18}
                onClick={handleDeleteACtionItem}
                className="cursor-pointer hover:text-red-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptPage;
