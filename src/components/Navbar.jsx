import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaArrowRight, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import ProfirstLogo from "./ProfirstLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { path: "/", label: "Services" },
    { path: "/coverage", label: "Coverage" },
    { path: "/aboutus", label: "About Us" },
    { path: "/pricing", label: "Pricing" },
    { path: "/be-a-rider", label: "Be a Rider" },
  ];

  const handleLogout = async () => {
    await signOutUser();
    navigate("/");
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between rounded-full bg-white shadow-sm relative">
        {/* Logo */}
        <ProfirstLogo />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "bg-lime-400 text-sm px-4 py-1.5 rounded-full font-medium hover:bg-lime-500 transition"
                  : "text-gray-700 hover:text-lime-500 text-sm transition"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border"
                title={user?.displayName}
              />
              <button
                onClick={handleLogout}
                className="bg-lime-400 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-lime-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to={"/auth/login"}
                className="border border-gray-300 px-4 py-1.5 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Sign In
              </NavLink>
              <NavLink
                to={"/auth/register"}
                className="bg-lime-400 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-lime-500 transition"
              >
                Sign Up
              </NavLink>
            </>
          )}
          <button className="bg-black text-white p-2 rounded-full -rotate-45 transition-transform -ml-4 ">
            <FaArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-2xl text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-4 right-4 bg-white shadow-lg rounded-xl z-50 p-4 md:hidden flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-lime-400 px-3 py-1.5 rounded-full font-medium"
                    : "text-gray-700 hover:text-lime-500 transition"
                }
              >
                {link.label}
              </NavLink>
            ))}

            <hr className="my-2" />

            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border"
                    title={user?.displayName}
                  />
                  <span className="text-gray-600 text-sm">{user?.displayName?.split(" ")[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="border border-gray-300 px-4 py-1.5 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to={"/auth/login"}
                  className="border border-gray-300 px-4 py-1.5 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to={"/auth/register"}
                  className="bg-lime-400 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-lime-500 transition"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
