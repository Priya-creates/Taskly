import React from "react";
import Title from "./components/Title";
import { TiPencil } from "react-icons/ti";
import AddTask from "./components/AddTask";
import { toast, ToastContainer } from "react-toastify";
import { IoSearch } from "react-icons/io5";
import SearchTask from "./components/SearchTask";
import TaskCount from "./components/TaskCount";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import TaskList from "./components/TaskList";
import { MdFilterAlt } from "react-icons/md";
import { BiSort } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";

const App = () => {
  const [taskList, setTaskList] = React.useState([]);
  const [showTaskBar, setShowTaskBar] = React.useState(false);
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(""); // replaces hasSearched + masterSearchList
  const [showFilter, setShowFilter] = React.useState(false);
  const [showSort, setShowSort] = React.useState(false);

  // UI states controlling filter & sort
  const [filters, setFilters] = React.useState({
    inprogress: false,
    incompleted: false,
    completed: false,
  });
  const [sortType, setSortType] = React.useState("old-to-new"); // default

  function handleClearTasks() {
    localStorage.setItem("taskList", JSON.stringify([]));
    setTaskList([]);
    toast.success("All tasks are cleared !");
  }
  const isMobile = useMediaQuery({ maxWidth: 767 });

  React.useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    setTaskList(tasks);
  }, []);

  // displayTasks is derived from taskList + searchQuery + filters + dateSort
  const displayTasks = React.useMemo(() => {
    let arr = taskList ? [...taskList] : [];

    // 1) Search
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      arr = arr.filter((t) => (t.task || "").toLowerCase().includes(q));
    }

    // 2) Filter (status)
    const activeFilters = Object.keys(filters).filter((k) => filters[k]);
    if (activeFilters.length) {
      arr = arr.filter((t) => activeFilters.includes(t.status));
    }

    // 3) Sort by date
    arr.sort((a, b) => {
      if (sortType === "new-to-old" || sortType === "old-to-new") {
        const ta = new Date(a.createdAt).valueOf();
        const tb = new Date(b.createdAt).valueOf();
        return sortType === "new-to-old" ? tb - ta : ta - tb;
      } else if (sortType === "a-to-z") {
        return (a.task || "").localeCompare(b.task || "");
      } else if (sortType === "z-to-a") {
        return (b.task || "").localeCompare(a.task || "");
      }
      return 0;
    });

    return arr;
  }, [taskList, searchQuery, filters, sortType]);

  return (
    <div className="pt-6 w-[95%] sm:w-[80%] md:w-[85%] mx-auto">
      <ToastContainer position="bottom-right" theme="dark" />
      <Title />
      <div className="flex justify-between items-baseline gap-4">
        <div
          onClick={() => setShowSearchBar(true)}
          className="flex flex-row items-center gap-2 sm:gap-2 border-[1px] rounded-xl 
             p-[1px] mt-4 hover:scale-105 transition-all duration-300 
             hover:bg-black hover:text-white cursor-pointer
             text-sm sm:text-base py-1 sm:py-1 px-2 sm:px-2 "
        >
          <p>{isMobile ? "Search" : "Search a task"}</p>
          <IoSearch />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowTaskBar(true)}
            className="flex items-center gap-2 border-[1px] rounded-xl 
             py-1 px-2 mt-4 hover:scale-105 transition-all duration-300 
             hover:bg-black hover:text-white cursor-pointer
             text-sm sm:text-base py-1 sm:py-1 px-2 sm:px-2"
          >
            <div>{isMobile ? "Add" : "Add a task"}</div>
            <div>
              <TiPencil />
            </div>
          </button>
          <button
            onClick={handleClearTasks}
            className="flex items-center gap-2 border-[1px] rounded-xl 
             py-1 px-2 mt-4 hover:scale-105 transition-all duration-300 
             hover:bg-black hover:text-white cursor-pointer
             text-sm sm:text-base py-1 sm:py-1 px-2 sm:px-2"
          >
            <div>{isMobile ? "Clear all" : "Clear all tasks"}</div>
          </button>
        </div>
      </div>

      <div className="flex sm:items-baseline sm:flex-row sm:justify-between sm:mb-5 flex-col mt-4 gap-0 items-start gap-4 ">
        <div className="flex justify-start items-center gap-4">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className=`flex items-center gap-1 border rounded-[7px] 
                 p-[0.5px] sm:p-[0.7px] px-2 sm:px-2 
                 hover:scale-105 transition-all duration-300 hover:bg-black hover:text-white
                 text-sm sm:text-base {${showFilter}}`
          >
            <div>Filter</div>
            <MdFilterAlt />
          </button>
          <button
            onClick={() => setShowSort((prev) => !prev)}
            className="flex items-center gap-1 border rounded-[7px] 
                 p-[0.5px] sm:p-[0.7px] px-2 sm:px-2 
                 hover:scale-105 transition-all duration-300 hover:bg-black hover:text-white
                 text-sm sm:text-base"
          >
            <div>Sort</div>
            <BiSort />
          </button>
        </div>
        <TaskCount taskList={taskList} />
      </div>

      {showFilter && (
        <Filter filters={filters} setFilters={setFilters} taskList={taskList} />
      )}

      {showSort && <Sort sortType={sortType} setSortType={setSortType} />}
      {showSearchBar && (
        <SearchTask
          taskList={taskList}
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      {showTaskBar && (
        <AddTask
          taskList={taskList}
          setTaskList={setTaskList}
          showTaskBar={showTaskBar}
          setShowTaskBar={setShowTaskBar}
        />
      )}

      <TaskList
        taskList={taskList}
        setTaskList={setTaskList}
        displayTasks={displayTasks}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default App;
