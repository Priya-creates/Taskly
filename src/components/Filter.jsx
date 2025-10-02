import React from "react";

const Filter = ({ filters, setFilters }) => {
  function handleChange(e) {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  }

  return (
    <div className="text-sm sm:text-[15px] mt-4 px-4 py-2 bg-gray-300 w-[50%] rounded ">
      <div>
        <label className="flex justify-between mb-1">
          Inprogress
          <input
            type="checkbox"
            name="inprogress"
            checked={filters.inprogress}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label className="flex justify-between mb-1">
          Incompleted
          <input
            type="checkbox"
            name="incompleted"
            checked={filters.incompleted}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label className="flex justify-between">
          Completed
          <input
            type="checkbox"
            name="completed"
            checked={filters.completed}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Filter;
