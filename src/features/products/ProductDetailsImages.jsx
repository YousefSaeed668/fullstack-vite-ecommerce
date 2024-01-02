import { useState } from "react";

function ProductDetailsImages({ main_image, images_gallery }) {
  const allImages =
    [main_image, ...images_gallery].length <= 5
      ? [main_image, ...images_gallery]
      : [main_image, ...images_gallery].slice(0, 5);
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="flex max-lg:flex-col-reverse gap-4 max-w-lg md:max-w-sm lg:max-w-xl">
      <div className="gallery max-lg:flex max-lg:justify-between max-lg:flex-wrap">
        {allImages.map((image, index) => (
          <img
            src={image}
            alt={index}
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`max-lg:w-[70px]  w-[100px] cursor-pointer mt-4 duration-300 ${
              index === currentImage ? "border-4 border-grey-600  p-1" : ""
            }`}
          />
        ))}
      </div>
      <div className="imgContainer">
        <img
          src={allImages[currentImage]}
          alt={currentImage}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ProductDetailsImages;
