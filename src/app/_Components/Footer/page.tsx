import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-gray-300 py-6 ">
      <div className="container mx-auto px-6 md:flex md:items-center md:justify-between">
        {/* Logo / Title */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-white">FreshCart</h2>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <ul className="flex justify-center md:justify-end gap-6 text-sm">
          <li>
            <a href="#" className="hover:text-white transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
