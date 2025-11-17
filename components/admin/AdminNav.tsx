"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import classNames from "classnames";
import { motion } from "framer-motion";
import {
  MdDashboard,
  MdArticle,
  MdEvent,
  MdPhotoLibrary,
  MdPeople,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { toast } from "react-toastify";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully! 👋");
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: MdDashboard },
    { name: "News", href: "/admin/news", icon: MdArticle },
    { name: "Events", href: "/admin/events", icon: MdEvent },
    { name: "Gallery", href: "/admin/gallery", icon: MdPhotoLibrary },
    { name: "Staff", href: "/admin/staff", icon: MdPeople },
    { name: "Settings", href: "/admin/settings", icon: MdSettings },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-64 bg-white shadow-lg h-screen flex flex-col sticky top-0"
    >
      {/* Header - Fixed */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        <p className="text-xs text-gray-500 mt-1">Content Management</p>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className={classNames(
                    "flex items-center px-4 py-3 rounded-lg transition-all duration-200",
                    {
                      "bg-primary text-white shadow-md": isActive,
                      "text-gray-700 hover:bg-gray-100 hover:translate-x-1":
                        !isActive,
                    }
                  )}
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Logout - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-gray-50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          <MdLogout size={20} className="mr-3" />
          Logout
        </motion.button>
      </div>
    </motion.aside>
  );
}
