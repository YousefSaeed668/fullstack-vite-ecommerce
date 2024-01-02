import { Link } from "react-router-dom";
import { styles } from "../styles";

function Empty({ type }) {
  return (
    <div
      className={`${styles.container} h-[80vh] flex flex-col items-center justify-center`}
    >
      <h1 className="text-4xl md:text-5xl mb-16 ">Your {type} Is Empty</h1>
      <Link to="/" className="text-primary text-2xl md:text-3xl ">
        &larr; Continue Shopping
      </Link>
    </div>
  );
}

export default Empty;
