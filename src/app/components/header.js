"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Header = () => {
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

          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.button
              className="bg-[#393F37] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#4a5246] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .querySelector("#join-form")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Join Now
            </motion.button>
          </motion.div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
