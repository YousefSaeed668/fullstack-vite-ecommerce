import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../features/products/useProducts";
import Spinner from "./Spinner";
import Card from "./Card";
import Button from "./Button";

function HomeStore() {
  const { category } = useParams();
  const navigate = useNavigate();

  const { isLoading, products } = useProducts(category || "Is_New", "home");
  if (!category) navigate("/Is_New");

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="py-5">
      <h2 className="text-rblack font-bold text-center md:text-xl mb-6">
        CHECK OUR PRODUCTS
      </h2>
      <div
        id="homeStore"
        className="flex justify-center font-semibold max-xs:text-xs gap-2 sm:gap-4 text-grey-600 items-center"
      >
        <NavLink to="/home/best_seller">BEST SELLER</NavLink>
        <NavLink to="/home/Is_New">NEW ARRIVAL</NavLink>
        <NavLink to="/home/most_wanted">MOST WANTED</NavLink>
      </div>
      <div className="flex flex-wrap gap-5 mt-10 justify-center">
        {products?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <Button
        buttonType="admin"
        onClick={() => navigate("/shop")}
        buttonStyle="block m-auto mt-16"
      >
        See More
      </Button>
    </div>
  );
}

export default HomeStore;
