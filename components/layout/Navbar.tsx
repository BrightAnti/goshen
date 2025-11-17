"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdMenu, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const pathname = usePathname();

  const isSubmenuActive = (submenu?: { href: string }[]) => {
    if (!submenu) return false;
    return submenu.some((item) => pathname.startsWith(item.href));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubmenu = (name: string) => {
    setExpandedMenu(expandedMenu === name ? null : name);
  };

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredMenu(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setHoveredMenu(null), 150);
    setHoverTimeout(timeout);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "About us",
      href: "/about",
      submenu: [
        { name: "Message from the Director", href: "/about/director-message" },
        { name: "About GCS", href: "/about/about-gcs" },
        // { name: "History", href: "/about/history" },
      ],
    },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    {
      name: "News & Events",
      href: "/news",
      submenu: [
        { name: "News", href: "/news" },
        { name: "Events", href: "/events" },
      ],
    },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <>
      <div className="h-12 md:h-20"></div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled ? "shadow-md border-gray-200" : "border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 md:h-20 gap-4">
            {/* Logo */}

            <div className="flex-1 flex justify-left md:justify-start">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-12 md:h-12">
                  <Image
                    src="/logo/logo.jpg"
                    alt="School Logo"
                    fill
                    sizes="48px"
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="hidden md:block text-lg md:text-xl font-bold text-green-700 transition-colors">
                  {process.env.NEXT_PUBLIC_SITE_NAME ||
                    "Goshen Community School"}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => {
                const active =
                  pathname === link.href || isSubmenuActive(link.submenu);

                const hasSubmenu = !!link.submenu;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Desktop parent buttons */}
                    {hasSubmenu ? (
                      <button
                        type="button"
                        className={`px-3 py-2 rounded-md text-sm font-medium inline-flex items-center transition-colors ${
                          active
                            ? "text-green-700 bg-green-50" // active looks like hover
                            : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                        }`}
                      >
                        {link.name}
                        <svg
                          className="ml-1 w-4 h-4 transform transition-transform duration-300 ease-out"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium inline-flex items-center transition-colors ${
                          active
                            ? "text-green-700 bg-green-50" // active looks like hover
                            : link.name === "Contact us"
                            ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                            : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}

                    {/* Dropdown */}
                    {hasSubmenu && (
                      <AnimatePresence>
                        {hoveredMenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50"
                            onMouseEnter={() => handleMouseEnter(link.name)}
                            onMouseLeave={handleMouseLeave}
                          >
                            {link.submenu.map((sublink) => (
                              <Link
                                key={sublink.href}
                                href={sublink.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                              >
                                {sublink.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-100"
            >
              {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 overflow-hidden max-h-[70vh] overflow-y-auto"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link, index) => {
                  const active =
                    pathname === link.href || isSubmenuActive(link.submenu);

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.submenu ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(link.name)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                              active
                                ? "bg-green-700 text-white"
                                : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                            }`}
                          >
                            <span>{link.name}</span>
                            <motion.svg
                              animate={{
                                rotate: expandedMenu === link.name ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </motion.svg>
                          </button>

                          <AnimatePresence>
                            {expandedMenu === link.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden pl-4 space-y-1"
                              >
                                {link.submenu.map((sublink) => (
                                  <motion.div
                                    key={sublink.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Link
                                      href={sublink.href}
                                      className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                                      onClick={() => {
                                        setIsOpen(false);
                                        setExpandedMenu(null);
                                      }}
                                    >
                                      {sublink.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                            active
                              ? "bg-green-700 text-white"
                              : link.name === "Contact us"
                              ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                              : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
