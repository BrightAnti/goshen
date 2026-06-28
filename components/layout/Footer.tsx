"use client";

import {
  MdEmail,
  MdPhone,
  MdAccessTime,
  MdLocationOn,
} from "react-icons/md";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { motion } from "framer-motion";

const colClass = "text-sm";

const headingClass =
  "text-white font-semibold uppercase tracking-wide text-xs mb-3 flex items-center gap-2";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { Icon: FaFacebook, url: "https://facebook.com", label: "Facebook" },
    { Icon: FaLinkedin, url: "https://linkedin.com", label: "LinkedIn" },
    { Icon: FaYoutube, url: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* School Hours */}
          <div className={colClass}>
            <h3 className={headingClass}>
              <MdAccessTime className="text-[#FFD600]" size={15} />
              School Hours
            </h3>
            <ul className="space-y-1.5 text-gray-400 leading-snug">
              <li>
                <span className="text-gray-300">Mon – Thu:</span> 8:00am – 3:00pm
              </li>
              <li>
                <span className="text-gray-300">Friday:</span> 8:00am – 2:00pm
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className={colClass}>
            <h3 className={headingClass}>
              <MdLocationOn className="text-[#FFD600]" size={15} />
              Address
            </h3>
            <address className="not-italic text-gray-400 leading-snug space-y-1">
              <p>Tse Addo, Behind Fair, La</p>
              <p>Near the Goil filling station</p>
              <p className="pt-1 text-gray-500">
                P. O. Box CT1026, Cantonments, Accra
              </p>
            </address>
          </div>

          {/* Contact */}
          <div className={colClass}>
            <h3 className={headingClass}>
              <MdEmail className="text-[#FFD600]" size={15} />
              Contact
            </h3>
            <ul className="space-y-2 text-gray-400 leading-snug">
              <li>
                <a
                  href="mailto:goshencommunityschool@gmail.com"
                  className="inline-flex items-start gap-1.5 hover:text-white transition-colors break-all"
                >
                  <MdEmail className="text-blue-400 flex-shrink-0 mt-0.5" size={14} />
                  goshencommunityschool@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+233557752668"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MdPhone className="text-green-400 flex-shrink-0" size={14} />
                  +233 (0)55 775 2668
                </a>
              </li>
              <li>
                <a
                  href="tel:+233244870873"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MdPhone className="text-green-400 flex-shrink-0" size={14} />
                  +233 (0)24 487 0873
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className={colClass}>
            <h3 className={headingClass}>Follow Us</h3>
            <div className="flex gap-3">
              {socialIcons.map(({ Icon, url, label }, index) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-700/80 text-gray-200 hover:bg-[#007A33] hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  aria-label={label}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <motion.img
              src="/logo/logo.jpg"
              alt="Goshen Community School Logo"
              className="h-12 w-auto object-contain rounded-md flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            />
            <div className="text-xs text-gray-400 leading-tight">
              <p className="font-semibold text-white text-sm">
                Goshen Community School
              </p>
              <p className="italic text-gray-400">
                Motto:{" "}
                <span className="text-blue-400">
                  &ldquo;The Fruitful Vine&rdquo;
                </span>
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-xs text-center sm:text-right">
            © {currentYear} Goshen Community School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
