import { Link } from "react-router-dom";

function Logo() {
  return (
    <h1 className="text-lg md:text-2xl text-pblack font-bold ">
      <Link to="/" className="">
        LOGANCEE
      </Link>
    </h1>
  );
}

export default Logo;
