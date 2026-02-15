import { useState, useEffect } from "react";
import { Check, Edit, Trash2, Clock } from "lucide-react";
import { Modal } from "antd";
import {
  createActionItem,
  deleteActionItem,
  extractActionItems,
  fetchAllTasks,
  updateActionItem,
} from "../api/actionItems";
import { fetchRecentTranscripts } from "../api/transcript.js";
import Swal from "sweetalert2";

const defaultTaskInput = { task: "", owner: "", dueDate: "" };

const TranscriptPage = () => {
  const [transcript, setTranscript] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskInput, setTaskInput] = useState(defaultTaskInput);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [transcriptHistory, setTranscriptHistory] = useState([]);

  const showModal = (task = null) => {
    if (task) {
      setTaskInput({
        task: task.task,
        owner: task.owner || "",
        dueDate: task.dueDate || "",
      });
      setEditingTaskId(task._id);
    } else {
      setTaskInput(defaultTaskInput);
      setEditingTaskId(null);
    }
    setIsModalOpen(true);
  };
  const handleCancel = () => setIsModalOpen(false);

  const fetchTasks = async () => {
    try {
      const res = await fetchAllTasks();
      setTasks(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      Swal.fire({
        title: "Failed to fetch tasks",
        icon: "error",
        draggable: true,
      });
    }
  };

  const fetchTranscriptHistory = async () => {
    try {
      const res = await fetchRecentTranscripts();
      setTranscriptHistory(res?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch recent transcripts", error);
      Swal.fire({
        title: "Failed to fetch recent transcripts",
        icon: "error",
        draggable: true,
      });
    }
  };

  const handleExtract = async () => {
    if (!transcript.trim()) {
      Swal.fire({
        title: "Transcript is required",
        icon: "error",
        draggable: true,
      });
      return;
    }
    try {
      setLoading(true);
      await extractActionItems(transcript);
      setTranscript("");
      await fetchTasks();
      await fetchTranscriptHistory();
    } catch (error) {
      console.error("Extraction failed", error);
      Swal.fire({ title: "Extraction failed", icon: "error", draggable: true });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => setTranscript("");

  const handleSaveTask = async () => {
    if (!taskInput.task.trim()) {
      Swal.fire({
        title: "Task name is required",
        icon: "error",
        draggable: true,
      });
      return;
    }
    try {
      if (editingTaskId) {
        await updateActionItem(editingTaskId, taskInput);
        Swal.fire({
          title: "Task updated successfully",
          icon: "success",
          draggable: true,
        });
      } else {
        await createActionItem(taskInput);
        Swal.fire({
          title: "Task created successfully",
          icon: "success",
          draggable: true,
        });
      }
      setTaskInput(defaultTaskInput);
      setIsModalOpen(false);
      setEditingTaskId(null);
      await fetchTasks();
    } catch (error) {
      console.error("Failed to save task", error);
      Swal.fire({
        title: "Failed to save task",
        icon: "error",
        draggable: true,
      });
    }
  };

  const handleDeleteActionItem = async (itemId) => {
  
    try {
      await deleteActionItem(itemId);
      await fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
      Swal.fire({
        title: "Failed to delete task",
        icon: "error",
        draggable: true,
      });
    }
  };

  const handleUpdateStatus = async (item) => {
    try {
      await updateActionItem(item._id, {
        status: item.status === "completed" ? "pending" : "completed",
      });
      await fetchTasks();
    } catch (error) {
      console.error("Failed to update status", error);
      Swal.fire({
        title: "Failed to update status",
        icon: "error",
        draggable: true,
      });
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchTranscriptHistory();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 flex flex-col items-center gap-10">
      <div className="w-full flex flex-col items-center gap-6">
        <h1 className="font-bold text-2xl font-mono">TRANSCRIPT PROCESSOR</h1>
        <textarea
          className="w-full max-w-3xl h-40 p-6 rounded-2xl shadow-lg font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#082567]"
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
            className="bg-[#082567] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#0e3495] disabled:opacity-50"
            onClick={handleExtract}
          >
            {loading ? "Extracting..." : "Analyse & Extract"}
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h1 className="font-bold text-2xl font-mono">ACTIONABLE TASKS</h1>
          <button
            className="bg-[#082567] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#0e3495]"
            onClick={() => showModal()}
          >
            Add Task
          </button>
        </div>
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            No tasks yet. Extract some action items!
          </p>
        ) : (
          tasks.map((item) => (
            <div
              key={item._id}
              className={`bg-white shadow-md p-4 rounded-xl border border-gray-200 flex justify-between items-center ${
                item.status === "completed" ? "opacity-60 line-through" : ""
              }`}
            >
              <div>
                <h2 className="font-semibold text-lg">{item.task}</h2>
                <p className="text-gray-500 text-sm">
                  Owner: {item.owner || "N/A"} | Due:{" "}
                  {item.dueDate || "No deadline"}
                </p>
              </div>
              <div className="flex gap-3 text-gray-500">
                <Check
                  size={18}
                  className="cursor-pointer hover:text-green-600"
                  onClick={() => handleUpdateStatus(item)}
                />
                <Edit
                  size={18}
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => showModal(item)}
                />
                <Trash2
                  size={18}
                  className="cursor-pointer hover:text-red-600"
                  onClick={() => handleDeleteActionItem(item._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-6 mt-10">
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

      <Modal
        title={
          <div className="text-2xl font-bold text-[#082567] mb-6 text-center">
            {editingTaskId ? "Edit Task" : "Add Task"}
          </div>
        }
        open={isModalOpen}
        onOk={handleSaveTask}
        onCancel={handleCancel}
        okText={editingTaskId ? "Update Task" : "Add Task"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
            placeholder="Task name (required)"
            value={taskInput.task}
            onChange={(e) =>
              setTaskInput({ ...taskInput, task: e.target.value })
            }
          />
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
            placeholder="Owner (optional)"
            value={taskInput.owner}
            onChange={(e) =>
              setTaskInput({ ...taskInput, owner: e.target.value })
            }
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
            value={taskInput.dueDate}
            onChange={(e) =>
              setTaskInput({ ...taskInput, dueDate: e.target.value })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default TranscriptPage;
