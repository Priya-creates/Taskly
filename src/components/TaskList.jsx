import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Confetti from "react-confetti";

const TaskList = ({ taskList, setTaskList, displayTasks, searchQuery }) => {
  const [editId, setEditId] = React.useState(null);
  const [editText, setEditText] = React.useState("");
  const [allTasksCompleted, setAllTasksCompleted] = React.useState(false);

  const handleDelete = (delIdx) => {
    const rem_tasks = taskList.filter((task) => task.id !== delIdx);
    setTaskList(rem_tasks);
    localStorage.setItem("taskList", JSON.stringify(rem_tasks));
    toast.success("Task deleted successfully!");
  };

  const handleStatus = (e, key) => {
    const value = e.target.value;

    if (value === "incompleted" || value === "inprogress") setAllTasksCompleted(false);
    if (value === "incompleted") toast.error("Task is marked incompleted!");

    const atleastTwo = taskList.filter(
      (item) => item.status === "incompleted" || item.status === "inprogress"
    );
    if (value === "completed" && atleastTwo.length >= 2) toast.success("Task is marked completed!");

    const updated_tasks = taskList.map((item) =>
      item.id === key ? { ...item, status: value } : item
    );
    setTaskList(updated_tasks);
    localStorage.setItem("taskList", JSON.stringify(updated_tasks));
  };

  React.useEffect(() => {
    if (taskList.length > 0 && taskList.every((item) => item.status === "completed")) {
      toast.success("Wohoo! You completed all the tasks!");
      setAllTasksCompleted(true);
      setTimeout(() => setAllTasksCompleted(false), 7000);
    }
  }, [taskList]);

  const handleEditSave = (e, edit_idx) => {
    if (e.key === "Enter") {
      const updated_tasks = taskList.map((item) =>
        item.id === edit_idx ? { ...item, task: editText } : item
      );
      localStorage.setItem("taskList", JSON.stringify(updated_tasks));
      setTaskList(updated_tasks);
      toast.success("Task updated successfully!");
      setEditId(null);
      setEditText("");
    }
  };

  const tasksToRender = displayTasks || [];

  return (
    <div className="bg-gray-200 mt-5 p-2 sm:p-3 rounded mx-auto w-[100%]">
      <div className="p-3 sm:p-4 rounded bg-gray-50 flex flex-col gap-y-3 sm:gap-y-4">
        {tasksToRender.length > 0 ? (
          tasksToRender.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4"
            >
              {editId === item.id ? (
                <input
                  type="text"
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleEditSave(e, item.id)}
                  className="border p-1 rounded w-full sm:w-auto text-sm"
                />
              ) : (
                <div
                  className={`mb-1 sm:mb-0 font-semibold text-sm ${
                    item.status === "completed" ? "line-through" : ""
                  }`}
                >
                  {item.task}
                </div>
              )}

              <div className="text-gray-500 text-xs sm:text-sm">
                Created at:{" "}
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 items-center">
                <select
                  value={item.status}
                  onChange={(e) => handleStatus(e, item.id)}
                  className={`border p-[2px] px-2 rounded text-xs sm:text-sm ${
                    item.status === "inprogress"
                      ? "bg-[#a0a0a0]"
                      : item.status === "completed"
                      ? "bg-[#4a4a4a] text-white"
                      : item.status === "incompleted"
                      ? "bg-[#d1d1d1]"
                      : ""
                  }`}
                >
                  <option value="inprogress">In-progress</option>
                  <option value="completed">Completed</option>
                  <option value="incompleted">Incompleted</option>
                </select>

                <div
                  className="flex items-center gap-1 border p-[2px] px-2 rounded cursor-pointer text-xs sm:text-sm"
                  onClick={() => {
                    setEditId(item.id);
                    setEditText(item.task);
                  }}
                >
                  <MdEdit size={14} />
                  <span>Edit</span>
                </div>

                <div
                  onClick={() => handleDelete(item.id)}
                  className="cursor-pointer text-xs sm:text-sm"
                >
                  <MdDelete size={16} />
                </div>
              </div>
            </div>
          ))
        ) : searchQuery && searchQuery.trim() ? (
          <div className="text-center text-sm">No matching tasks found</div>
        ) : (
          <div className="text-center text-sm">No tasks are added</div>
        )}

        {allTasksCompleted && <Confetti recycle={false} numberOfPieces={800} />}
      </div>
    </div>
  );
};

export default TaskList;
