import { NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { styles } from "../styles";
import { LuMenu } from "react-icons/lu";
import { useState } from "react";
import Logo from "./Logo";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";
import { useUser } from "../features/authentication/useUser";

import HeaderAccount from "./HeaderAccount";

function Header() {
  const { isLoading, user } = useUser();
  const userName = user?.displayName;
  const userPhoto = user?.photoURL;
  const userEmail = user?.email?.split("@")[0];

  const userPhotoRep = "http://tinyurl.com/48cc68w8";
  const [showMenu, setShowMenu] = useState(false);
  const cartCount = useSelector(selectCartCount);

  if (isLoading) return null;
  return (
    <header className="md:font-semibold py-5 text-sm lg:text-lg bg-[#f5f5f5] text-grey-600">
      <div
        className={`${styles.container} ${styles.flexcenterV} justify-between`}
      >
        <Logo />
        <nav
          className={`${
            styles.flexcenterV
          } sm:justify-end max-sm:justify-center max-sm:space-y-6  duration-300 ${
            showMenu ? "left-0" : "left-0"
          } max-sm:z-30 max-sm:w-[15rem]   sm:space-x-1 max-sm:absolute max-sm:h-screen duration-300
          max-sm:top-0 max-sm:bg-[#f5f5f5] flex max-sm:flex-col ${
            showMenu ? "max-sm:translate-x-0 " : "max-sm:-translate-x-full"
          }  sm:flex  ${user ? "lg:space-x-32" : "lg:space-x-64"} flex-[2]`}
        >
          <ul
            className={`${styles.flexcenterV}  sm:space-x-4 md:space-x-8 lg:space-x-12 max-sm:flex-col max-sm:items-center max-sm:space-y-4`}
          >
            <li>
              <NavLink to="/" onClick={() => setShowMenu(false)}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" onClick={() => setShowMenu(false)}>
                SHOP
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" onClick={() => setShowMenu(false)}>
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setShowMenu(false)}>
                CONTACT
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/orders">ORDERS</NavLink>
              </li>
            )}
          </ul>
          <ul
            className={`${styles.flexcenterV} max-sm:space-x-4 space-x-3 ${
              user ? "space-x-4 max-sm:flex-col max-sm:gap-y-3" : ""
            }`}
          >
            <li>
              <NavLink to="/cart">
                <Badge badgeContent={cartCount} color="primary">
                  <HiOutlineShoppingBag size={20} />
                </Badge>
              </NavLink>
            </li>
            <li>
              {user ? (
                <HeaderAccount
                  userName={userName || userEmail}
                  userPhoto={userPhoto || userPhotoRep}
                />
              ) : (
                <NavLink to="/login">
                  <IoPersonSharp size={20} />
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
        {showMenu && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 20,
            }}
            onClick={() => setShowMenu(false)}
          />
        )}
        <LuMenu
          size={24}
          className="text-black cursor-pointer sm:hidden"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
    </header>
  );
}

export default Header;
