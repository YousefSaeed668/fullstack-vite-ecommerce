import { useParams } from "react-router-dom";
import { useProduct } from "../../features/products/useProduct";
import { styles } from "../../styles";
import ProductDetailsImages from "../../features/products/ProductDetailsImages";
import Spinner from "../../ui/Spinner";
import ProductInfo from "../../features/products/ProductInfo";
import RelatedProducts from "../../features/products/RelatedProducts";
import { useOrders } from "../../features/orders/useOrders";
import ReviewProduct from "../../ui/ReviewProduct";
import ProductReviews from "../../ui/ProductReviews";

function ProductDetails() {
  const { id } = useParams();
  const { isLoading, product } = useProduct(id);
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const { orders } = useOrders(user.uid);
  const isHere = orders?.find((order) =>
    order?.cartItem?.find((item) => item.id === id)
  );

  if (isLoading) return <Spinner />;
  return (
    <div className={`${styles.container} `}>
      <div className="gap-10 grid grid-cols-[auto,1fr] max-[930px]:grid-cols-[1fr] py-10 items-start lg:items-stretch">
        <ProductDetailsImages
          main_image={product?.main_image}
          images_gallery={product?.images_gallery}
        />
        <ProductInfo product={product} />
      </div>
      <RelatedProducts category={product.product_category} />
      <ProductReviews id={id} product={product} />
      {isHere && <ReviewProduct id={id} />}
    </div>
  );
}

export default ProductDetails;
