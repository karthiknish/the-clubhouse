"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  {
    label: "Club Hospitality",
    href: "/club-hospitality",
  },
  {
    label: "Luxury Travel",
    href: "/luxury-travel",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleJoinClick = () => {
    document
      .querySelector("#join-form")
      ?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.png"
              alt="Clubhouse Logo"
              width={180}
              height={40}
              priority
            />
          </Link>

          <motion.button
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#d7d2c9] text-[#393F37] transition hover:border-[#393F37] md:hidden"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="absolute h-0.5 w-6 bg-current transition-all duration-300"
              style={{
                transform: isMenuOpen ? "rotate(45deg)" : "translateY(-6px)",
              }}
            />
            <span
              className="absolute h-0.5 w-6 bg-current transition-all duration-300"
              style={{ opacity: isMenuOpen ? 0 : 1 }}
            />
            <span
              className="absolute h-0.5 w-6 bg-current transition-all duration-300"
              style={{
                transform: isMenuOpen ? "rotate(-45deg)" : "translateY(6px)",
              }}
            />
          </motion.button>

          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={item.href}
                  className="text-[#393F37] font-semibold hover:text-[#4a5246] transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="https://member.theclubhouse.co.uk/Identity/Account/Login?ReturnUrl=%2F"
                className="text-[#393F37] font-semibold hover:text-[#4a5246] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign In
              </Link>
            </motion.div>
            <motion.button
              className="bg-[#393F37] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#4a5246] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinClick}
            >
              Join Now
            </motion.button>
          </motion.div>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#e5e2dc] bg-white"
          >
            <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-base font-semibold text-[#393F37] transition hover:bg-[#f7f5f0]"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="https://member.theclubhouse.co.uk/Identity/Account/Login?ReturnUrl=%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl px-4 py-3 text-base font-semibold text-[#393F37] transition hover:bg-[#f7f5f0]"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <button
                type="button"
                onClick={handleJoinClick}
                className="w-full rounded-full bg-[#393F37] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#4a5246]"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Header;
