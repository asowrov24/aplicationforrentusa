import { useState } from "react";
import { AiOutlineFork } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdMenu, MdOutlineSettingsApplications } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logOut } = useAuth();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#089662",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire(
              "Logged out!",
              "You have been successfully logged out.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Logout failed:", error);
          });
      }
    });
  };

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/dashboard/apply", icon: <MdOutlineSettingsApplications />, label: "Rental Application" },
    { to: "/dashboard/promoters", icon: <AiOutlineFork />, label: "Promoters" },
    { to: "/dashboard/profile", icon: <BiUser />, label: "Profile" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed  sm:static top-0 left-0 z-40 bg-[#089662] text-white w-64 h-[110vh] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">🏠 Dashboard</h1>
          <ul className="menu space-y-2">
            {navItems.map(({ to, icon, label }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md ${
                      isActive
                        ? "bg-white text-[#089662] font-semibold"
                        : "hover:bg-green-600"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {icon} {label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-600 w-full text-left"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="sm:hidden fixed top-4 left-4 z-50 bg-[#089662] text-white p-2 rounded-full shadow-lg"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <IoIosClose size={24} /> : <MdMenu size={24} />}
        </button>

        <div className="mt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
