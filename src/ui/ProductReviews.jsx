import StarsRating from "react-star-rate";

function ProductReviews({ product }) {
  const reviews = product?.reviews;
  if (!reviews)
    return (
      <h3 className="text-center font-semibold text-2xl md:text-3xl mb-10">
        The Product Has No Reviews Yet
      </h3>
    );
  return (
    <div className="mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#ef4444] mb-7">
        Product Review
      </h2>
      <div>
        {reviews?.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-2   p-2 rounded-md mb-4"
          >
            <div className="flex items-center gap-2">
              <img
                src={review.userImage}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <h3 className="text-lg font-semibold">{review.userName}</h3>
              <span className="text-gray-400 text-sm block ml-3">
                {review.reviewDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">
                <StarsRating value={review.rate} disabled={true} />
              </span>
            </div>
            <p className="mt-5">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReviews;
