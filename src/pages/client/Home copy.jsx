import { Outlet } from "react-router-dom";
import { styles } from "../../styles";
import HomeCategory from "../../ui/HomeCategory";
import MainSwiper from "../../ui/MainSwiper";

function Home() {
  return (
    <>
      <div className={`${styles.container} py-7`}>
        <MainSwiper />
        <HomeCategory />
        <Outlet />
      </div>
    </>
  );
}

export default Home;
