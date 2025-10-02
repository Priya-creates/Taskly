import React from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const SearchTask = ({ showSearchBar, setShowSearchBar, searchQuery, setSearchQuery }) => {
  const [localSearch, setLocalSearch] = React.useState(searchQuery || "");

  function handleSearch(e) {
    e.preventDefault();
    if (!localSearch.trim()) {
      setSearchQuery("");
      toast.error("Please enter a task before searching");
      return;
    }
    setSearchQuery(localSearch.trim());
    // optional: close search bar
    // setShowSearchBar(false);
  }

  return (
    <div>
      {showSearchBar && (
        <div className="mx-auto flex items-center justify-between w-[95%] sm:w-[90%] mt-5">
          <form
            onSubmit={handleSearch}
            className="flex sm:w-[98%] w-[90%] mx-auto justify-between border rounded-xl p-1.5 px-2 sm:px-3 sm:py-2"
          >
            <input
              type="text"
              placeholder="Enter your task"
              className="px-2 w-[85%] sm:w-[88%] outline-0 bg-gray-200 text-sm sm:text-[15px]"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <button className="bg-black text-white p-2 px-3 w-[18%] sm:w-[12%] hover:bg-gray-800 text-sm sm:text-[15px]">
              Search
            </button>
          </form>
          <div
            className="w-[5%] text-black flex justify-center items-center cursor-pointer"
            onClick={() => {
              setShowSearchBar(false);
              setSearchQuery("");
              setLocalSearch("");
            }}
          >
            <RxCross2 className="font-bold hover:scale-110" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchTask;
