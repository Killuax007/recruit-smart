"use client";

import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import ThemeToggleButton from "./theme-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white dark:bg-[#0A0A0A] shadow-md">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-2 rounded-md  cursor-pointer">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white ml-3">
            RecruitSmart
          </span>
        </Link>

        <button
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`w-full md:w-auto md:flex transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col items-center justify-center md:flex-row font-medium mt-4 md:mt-0 md:space-x-8 p-2 md:p-0">
            {[
              { name: "Home", path: "/" },
              { name: "Jobs", path: "/jobs" },
              { name: "Resume", path: "/resume" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="block py-2 px-3  text-gray-700 dark:text-white hover:text-gray-900 md:hover:bg-transparent md:p-0"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="items-center ">
              <ThemeToggleButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
