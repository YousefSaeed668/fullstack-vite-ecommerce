import { FaPlus } from "react-icons/fa6";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function Card({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productPrice = Number(product.price).toFixed(2);
  const handleButtonClick = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        main_image: product.main_image,
        name: product.name,
        price: product.price,
      })
    );
  };
  return (
    <div
      className="max-w-[320px] max-md:min-w-[260px] md:min-w-[290px] cursor-pointer group flex-1"
      onClick={() => navigate(`/product-details/${product.id}`)}
    >
      <div className="relative ">
        <img
          src={product.main_image}
          alt=""
          className="h-[22rem] object-cover"
        />
        <span className="absolute text-white group-hover:opacity-100 opacity-0 duration-200 bg-pblack p-3 cursor-pointer bottom-0 right-0">
          <FaPlus />
        </span>
      </div>
      <div className="flex justify-between mt-3 items-center ">
        <div className="flex-1">
          <h3 className=" text-grey-600 font-semibold mb-2">{product.name}</h3>
          <p className="font-semibold">${productPrice}</p>
        </div>
        <Button
          buttonType="client"
          buttonStyle="mt-2 "
          onClick={handleButtonClick}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}

export default Card;
