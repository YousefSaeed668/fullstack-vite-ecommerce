import logoImg from "../assets/logo.png";
import AdminNav from "./AdminNav";

function AdminAside({ isOpen }) {
  return (
    <div
      className={`row-span-full overflow-hidden lg:px-3 lg:pt-12 border-r border-slate-50 ${
        isOpen ? "px-3 pt-12" : ""
      }`}
    >
      <h2 className="">
        <img src={logoImg} alt="" className="hidden lg:block w-32 m-auto" />
      </h2>
      <AdminNav />
    </div>
  );
}

export default AdminAside;
