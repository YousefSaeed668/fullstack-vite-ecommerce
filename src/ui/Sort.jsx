import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Sort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("latest");

  return (
    <div className="flex gap-4 items-center">
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        className="font-semibold border-2 border-gray-300 px-2 py-1 rounded-md"
        value={sort}
        onChange={(e) => {
          searchParams.set("sort", e.target.value);
          setSearchParams(searchParams);
          setSort(e.target.value);
        }}
      >
        <option value="latest">Latest First</option>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
    </div>
  );
}

export default Sort;
