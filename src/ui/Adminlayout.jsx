import { useState } from "react";

import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminAside from "./AdminAside";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`grid h-[100vh]  duration-300 lg:grid-cols-[18rem,1fr] ${
        isOpen ? "grid-cols-[5rem,1fr]" : "grid-cols-[0rem,1fr] "
      } grid-rows-[auto,1fr]`}
    >
      <AdminHeader setIsOpen={setIsOpen} />
      <AdminAside isOpen={isOpen} />
      <div className="bg-[#fafafa]">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
