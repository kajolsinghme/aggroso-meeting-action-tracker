import React from "react";
import { Check, Edit, Trash2 } from "lucide-react";

const ActionItemList = () => {
  const tasks = [
    { id: 1, task: "Finalize security audit", owner: "Liam", dueDate: "2026-02-20" },
    { id: 2, task: "Prepare client presentation", owner: "Emma", dueDate: "2026-02-18" },
    { id: 3, task: "Update project documentation", owner: "Noah", dueDate: "2026-02-22" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h1 className="font-bold text-2xl font-mono">ACTIONABLE TASKS</h1>
        <button className="bg-[#082567] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#0e3495] cursor-pointer">
          Add Task
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {tasks.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md p-4 rounded-xl border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.task}</h2>
              <p className="text-gray-500 text-sm">
                Owner: {item.owner} | Due: {item.dueDate}
              </p>
            </div>

            <div className="flex gap-3 text-gray-500">
              <Check size={18} />
              <Edit size={18} />
              <Trash2 size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionItemList;
