import React from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const AddTask = ({ taskList, setTaskList, showTaskBar, setShowTaskBar }) => {
  const [task, setTask] = React.useState("");

  // 🔑 load tasks from localStorage on mount
  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("taskList")) || [];
    setTaskList(saved);
  }, []);

  function handleTaskAdd(e) {
    e.preventDefault();
    if (!task.trim()) return toast.error("Please enter a task before saving."); // empty task na add ho
    //const newTaskList = [...taskList, task]; array of objects
    const newTaskList = [
      ...taskList,
      {
        id: Date.now(),
        task: task,
        status: "inprogress",
        createdAt: Date.now(),
      },
    ];
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setTaskList(newTaskList);
    toast.success("Task added sucessfully!");
    setTask("");
  }

  return (
    <div>
      {showTaskBar && (
        <div className="mx-auto flex items-center justify-between w-[95%] sm:w-[90%] mt-5">
          <form
            onSubmit={handleTaskAdd}
            className="flex sm:w-[98%] w-[90%] mx-auto justify-between border rounded-xl p-1.5 px-2 sm:px-3 sm:py-2"
          >
            <input
              type="text"
              placeholder="Enter your task"
              className="px-2 w-[85%] sm:w-[88%] outline-0 bg-gray-200 text-sm sm:text-[15px]"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="bg-black text-white p-2 px-3 w-[18%] sm:w-[12%] hover:bg-gray-800  text-sm sm:text-[15px]">
              Add
            </button>
          </form>
          <div
            className="w-[5%] text-black flex justify-center items-center"
            onClick={() => setShowTaskBar(false)}
          >
            <RxCross2 className="font-bold hover:scale-110 " />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AddTask;
