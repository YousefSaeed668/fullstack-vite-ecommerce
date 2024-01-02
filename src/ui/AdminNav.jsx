import { RxDashboard } from "react-icons/rx";
import { IoCart } from "react-icons/io5";
import { BsBoxSeamFill } from "react-icons/bs";

import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <RxDashboard />,
  },
  {
    name: "Orders",
    path: "orders",
    icon: <IoCart />,
  },
  {
    name: "Products",
    path: "products",
    icon: <BsBoxSeamFill />,
  },
];
function AdminNav() {
  return (
    <ul className="flex flex-col space-y-10 mt-16" id="asideHeader">
      {links.map((link, index) => (
        <li key={index + link.name}>
          <NavLink
            to={link.path}
            className="flex space-x-5 px-3 lg:px-5 py-4 hover:bg-[#ecf6ff]  text-[#989fa5] hover:text-[#44a5ff] items-center duration-300 rounded-md"
          >
            <span className="text-3xl">{link.icon}</span>
            <span className="font-semibold text-lg hidden lg:inline">
              {link.name}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default AdminNav;
