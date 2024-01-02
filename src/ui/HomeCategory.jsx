import { Link } from "react-router-dom";
import category1 from "../assets/category1.jpg";
import category2 from "../assets/category2.jpg";
import category3 from "../assets/category3.jpg";

const categoryData = [
  { title: "BEST FOR GIRLS", image: category1 },
  { title: "BEST FOR BOYS", image: category2 },
  { title: "BEST FOR KIDS", image: category3 },
];

function HomeCategory() {
  return (
    <div
      className={`px-0 mt-10 flex justify-between gap-5 flex-wrap items-center max-md:flex-col pb-16 border-b border-gray-200`}
    >
      {categoryData.map((category, index) => (
        <div className="relative flex-1 max-md:w-full" key={category.title}>
          <div className="absolute max-w-[5rem] flex flex-col h-full justify-around pl-4">
            <h1 className="text-pblack font-bold text-2xl">{category.title}</h1>
            <Link to={"/shop"} className="text-pblack font-bold">
              {" "}
              GO &rarr;{" "}
            </Link>
          </div>
          <img src={category.image} alt="" />
        </div>
      ))}
    </div>
  );
}

export default HomeCategory;
