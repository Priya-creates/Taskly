import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const Sort = ({ sortType, setSortType }) => {
  return (
    <div className=" text-sm sm:text-[15px] mt-4 px-4 py-2 bg-gray-300 w-[50%] rounded ">
      <div className="pb-2">
        <p className="mb-2">
          <b>Sort by Date</b>
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label className="flex items-center gap-0.5" htmlFor="new-to-old">
              Newest <IoIosArrowRoundForward /> Oldest
            </label>
            <input
              type="radio"
              name="sort-btn"
              id="new-to-old"
              value="new-to-old"
              checked={sortType === "new-to-old"}
              onChange={(e) => setSortType(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <label className="flex items-center gap-0.5" htmlFor="old-to-new">
              Oldest <IoIosArrowRoundForward /> Newest
            </label>
            <input
              type="radio"
              name="sort-btn"
              id="old-to-new"
              value="old-to-new"
              checked={sortType === "old-to-new"}
              onChange={(e) => setSortType(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/*div added */}
      <hr />
      <div>
        <p className="mb-2 pt-2">
          <b>Sort by alphabets</b>
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label className="flex items-center gap-0.5" htmlFor="a-to-z">
              A <IoIosArrowRoundForward /> Z
            </label>
            <input
              type="radio"
              name="sort-btn"
              id="a-to-z"
              value="a-to-z"
              checked={sortType === "a-to-z"}
              onChange={(e) => setSortType(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <label className="flex items-center gap-0.5" htmlFor="z-to-a">
              Z <IoIosArrowRoundForward /> A
            </label>
            <input
              type="radio"
              name="sort-btn"
              id="z-to-a"
              value="z-to-a"
              checked={sortType === "z-to-a"}
              onChange={(e) => setSortType(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sort;
