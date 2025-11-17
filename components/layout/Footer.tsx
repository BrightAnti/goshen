"use client";

import { MdEmail, MdPhone } from "react-icons/md";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { Icon: FaFacebook, url: "https://facebook.com", label: "Facebook" },
    { Icon: FaLinkedin, url: "https://linkedin.com", label: "LinkedIn" },
    { Icon: FaYoutube, url: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-200 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* School Hours */}
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-lg sm:text-xl">
              School Hours
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Mon – Fri: 8am – 3:30pm
            </p>
          </motion.div>

          {/* Address */}
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-lg sm:text-xl">
              Address
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Goshen Community School
              <br />
              2nd Circular Road, Cantonments
              <br />
              P.O.Box GP 2856
              <br />
              Accra, Ghana
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-lg sm:text-xl">
              Contact
            </h3>
            <p className="text-gray-300 text-sm sm:text-base mb-2 flex items-center justify-center">
              <MdEmail className="mr-2 text-blue-400" /> prinoffice@gcs.edu.gh
            </p>
            <ul className="text-gray-300 text-sm sm:text-base space-y-1">
              <li className="flex items-center justify-center">
                <MdPhone className="mr-2 text-green-400" /> +233 (0)30 397 9198
              </li>
              <li className="flex items-center justify-center">
                <MdPhone className="mr-2 text-green-400" /> +233 (0)30 277 3299
              </li>
              <li className="flex items-center justify-center">
                <MdPhone className="mr-2 text-green-400" /> +233 (0)30 277 5143
              </li>
              <li className="flex items-center justify-center">
                <MdPhone className="mr-2 text-green-400" /> +233 (0)30 397 9588
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-lg sm:text-xl">
              Follow Us
            </h3>
            <div className="flex space-x-4 mt-2 justify-center">
              {socialIcons.map(({ Icon, url, label }, index) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.img
              src="/logo/logo.jpg"
              alt="Goshen Community School Logo"
              className="h-16 w-auto object-contain rounded-md"
              whileHover={{ scale: 1.05 }}
            />
            <div className="text-sm text-gray-400 leading-tight">
              <p className="font-semibold text-white">
                Goshen Community School
              </p>
              <p className="italic text-gray-300">
                Motto:{" "}
                <span className="text-blue-400">“The Fruitful Vine”</span>
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-6 sm:mt-0">
            © {currentYear} Goshen Community School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
