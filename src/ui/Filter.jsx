import { useState } from "react";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";

const categories = [
  {
    name: "Men's Clothing",
    category: "men",
  },
  {
    name: "Women's Clothing",
    category: "women",
  },

  {
    name: "Kid's Clothing",
    category: "kids",
  },

  {
    name: "Smartphones",
    category: "smartphones",
  },
  {
    name: "Computers",
    category: "computers",
  },
];

function Filter({ isOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || 0);
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || 0);
  function handleClick(index) {
    searchParams.set("category", categories[index].category);
    setSearchParams(searchParams);
  }
  function handleApply() {
    searchParams.set("minPrice", minPrice);
    searchParams.set("maxPrice", maxPrice);
    setSearchParams(searchParams);
  }
  function resetFilters() {
    searchParams.delete("category");
    searchParams.delete("minPrice");
    searchParams.delete("maxPrice");
    setSearchParams(searchParams);
    setMinPrice(0);
    setMaxPrice(0);
  }
  return (
    <div
      className={`bg-[#F9FAFB] min-h-full overflow-hidden pt-12 pl-6 ${
        isOpen ? "min-w-[15rem]" : " -translate-x-full max-w-0"
      }  duration-500 transition-all `}
    >
      <div>
        <h3 className="text-lg md:text-xl  font-semibold mb-6">
          Filter By Category
        </h3>
        <div>
          <ul>
            {categories.map((category, index) => (
              <li
                className={`text-base md:text-lg mt-4 cursor-pointer border-l-4 pl-3  ${
                  selectedCategory === category.category
                    ? "border-l-[#dc2626]"
                    : "border-l-grey-300"
                }`}
                key={category.category}
                onClick={() => handleClick(index)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <h3 className="text-lg md:text-xl  font-semibold my-6">
          Filter By Price
        </h3>
        <div className="flex justify-between mb-9 ">
          <div>
            <label htmlFor="min">Min Price</label>
            <input
              type="number"
              name="min"
              onChange={(e) => setMinPrice(e.target.value)}
              value={minPrice}
              id="min"
              className="max-w-[4rem] bg-slate-200"
            />
          </div>
          <div>
            <label htmlFor="max">Max Price</label>
            <input
              value={maxPrice}
              type="number"
              onChange={(e) => setMaxPrice(e.target.value)}
              name="max"
              id="max"
              className="max-w-[4rem] bg-slate-200"
            />
          </div>
        </div>
        <Button
          buttonType={"admin"}
          buttonStyle="block mb-8"
          onClick={handleApply}
        >
          Apply
        </Button>
        <Button buttonType={"admin"} onClick={resetFilters}>
          Reset Filter
        </Button>
      </div>
    </div>
  );
}

export default Filter;
