import { MenuItem, Button, Menu } from "@mui/material";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSignout } from "../features/authentication/useSignout";

function HeaderAccount({ userName, userPhoto, type }) {
  const navigate = useNavigate();
  const { signOut } = useSignout();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    setAnchorEl(null);
    if (type === "logout") {
      signOut();
      // if (!isLoading) navigate("/login", { replace: true});
    } else {
      navigate(type);
    }
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={`${type === "dashboard" ? "!ml-auto" : ""}`}
      >
        <div className="flex items-center space-x-2">
          <img
            src={userPhoto || "https://i.pravatar.cc/"}
            alt=""
            className="w-[24px] h-[24px] rounded-full"
          />{" "}
          <span> {userName}</span>
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {type !== "dashboard" &&
          user?.uid === import.meta.env.VITE_APP_ADMIN_UID && (
            <MenuItem onClick={() => handleClose("/admin/dashboard")}>
              {" "}
              <RxDashboard className="mr-2" /> Dashboard
            </MenuItem>
          )}
        <MenuItem onClick={() => handleClose("/account")}>
          {" "}
          <IoPersonSharp className="mr-2" /> My account
        </MenuItem>
        <MenuItem onClick={() => handleClose("logout")}>
          {" "}
          <IoIosLogOut className="mr-2" />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderAccount;
