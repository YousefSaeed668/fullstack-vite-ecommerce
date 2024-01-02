import { useState } from "react";
import profileImg from "../../public/profile.jpg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col relative">
      <button className="" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-[13rem] flex justify-center items-center space-x-2 border border-state-200 py-1 px-1 rounded-lg">
          <img src={profileImg} className="w-10 h-10 rounded-lg" alt="" />
          <h4>Yousef Saeed</h4>

          <KeyboardArrowDownIcon className={isOpen ? "rotate-180 " : ""} />
        </div>
      </button>
      <ul
        className={`absolute w-full bg-white text-left top-[105%] ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li className="py-2 px-4">
          {" "}
          <LogoutIcon /> Logout
        </li>
        <li className="py-2 px-4">Saeed</li>
        <li className="py-2 px-4">Hakeem</li>
      </ul>
    </div>
  );
}

export default Profile;
