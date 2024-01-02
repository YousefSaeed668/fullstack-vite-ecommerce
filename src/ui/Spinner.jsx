import { BiLoaderAlt } from "react-icons/bi";

function Spinner({ size, color }) {
  return (
    <BiLoaderAlt
      className={`${
        size === "mini" ? "text-2xl" : "text-[12rem]"
      } animate-spin-slow ${color} m-auto`}
    />
  );
}

export default Spinner;
