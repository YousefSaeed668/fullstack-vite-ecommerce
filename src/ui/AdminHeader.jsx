import MenuIcon from "@mui/icons-material/Menu";
import HeaderAccount from "./HeaderAccount";
import { useUser } from "../features/authentication/useUser";

const userPhotoRep = "http://tinyurl.com/48cc68w8";

function AdminHeader({ setIsOpen }) {
  const { user } = useUser();

  const userName = user?.displayName;
  const userPhoto = user?.photoURL;
  const userEmail = user?.email?.split("@")[0];

  return (
    <header className="w-full px-5 py-2 flex justify-between items-center flex-wrap">
      <MenuIcon
        className="!hidden max-lg:!inline-block "
        onClick={() => setIsOpen((open) => !open)}
      />

      <HeaderAccount
        userName={userName || userEmail}
        userPhoto={userPhoto || userPhotoRep}
        type="dashboard"
      />
      {/* <Profile /> */}
    </header>
  );
}

export default AdminHeader;
