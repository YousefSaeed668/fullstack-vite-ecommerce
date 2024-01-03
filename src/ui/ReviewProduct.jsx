import { useState } from "react";
import StarsRating from "react-star-rate";
import Button from "./Button";
import toast from "react-hot-toast";
import { useSetProductReview } from "../features/products/useSetProductReview";

function ReviewProduct({ id }) {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userPhotoRep = "http://tinyurl.com/48cc68w8";
  const { setProductReview } = useSetProductReview(id);
  const today = new Date();
  const date = today.toDateString();
  function handleSubmit(e) {
    e.preventDefault();
    if (rate === 0 || review === "")
      return toast.error("Please Fill All Fields");
    setProductReview({
      productId: id,
      rate,
      review,
      userName: user.displayName || user?.email?.split("@")[0],
      userImage: user.photoURL || userPhotoRep,
      reviewDate: date,
    });
  }
  return (
    <div className="my-10">
      <h3 className="text-2xl md:text-3xl font-semibold text-center">
        Leave A Review
      </h3>

      <form className="flex flex-col mt-3" onSubmit={handleSubmit}>
        <StarsRating
          value={rate}
          onChange={(value) => {
            setRate(value);
          }}
        />
        <textarea
          className="outline-none flex-1 border border-gray-300 max-w-[30rem] resize-none h-16 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-3 py-2 focus:ring-inset focus:ring-primary "
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <Button buttonType="details" buttonStyle="w-fit ">
          Submit Review
        </Button>
      </form>
    </div>
  );
}

export default ReviewProduct;
