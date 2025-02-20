"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
const ROTATION_RANGE = 5;
const PERSPECTIVE = 400;
const INITIAL_DELAY = 0.2;
const CARD_ANIMATION_DURATION = 0.5;

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};

export const CardSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [ROTATION_RANGE, -ROTATION_RANGE]);
  const rotateY = useTransform(x, [-50, 50], [-ROTATION_RANGE, ROTATION_RANGE]);

  const cardData = {
    number: "CLUBHOUSE MEMBERSHIP",
    holder: "John Smith",
    expiry: "12/24",
  };

  const handleMove = (clientX, clientY, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseMove = (event) => {
    handleMove(event.clientX, event.clientY, event.currentTarget);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    handleMove(touch.clientX, touch.clientY, event.currentTarget);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getMaskedNumber = (number) => {
    return "********************";
  };

  return (
    <div className="flex items-center justify-center p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
        <div className="bg-white dark:bg-slate-800">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Your Gateway to Success</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join our exclusive membership program and unlock a world of
              opportunities. Connect with industry leaders, access premium
              resources, and elevate your business to new heights.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>✓ Exclusive networking events</li>
              <li>✓ Business growth resources</li>
              <li>✓ Premium support services</li>
              <li>✓ Member-only benefits</li>
            </ul>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: CARD_ANIMATION_DURATION }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleLeave}
          onMouseLeave={handleLeave}
          style={{ perspective: PERSPECTIVE }}
          className="relative touch-none"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            transition={springTransition}
          >
            <motion.div
              className="relative h-48 w-80 overflow-hidden rounded-2xl bg-gradient-to-br from-[#393F37] to-[#4a5246] p-6 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: CARD_ANIMATION_DURATION }}
            >
              <div className="flex items-center justify-between">
                <motion.div
                  className="flex items-center space-x-2 text-2xl font-bold text-white"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: INITIAL_DELAY,
                    duration: CARD_ANIMATION_DURATION,
                  }}
                >
                  <Image
                    src="/Logo.png"
                    alt="Clubhouse Logo"
                    width={100}
                    height={100}
                    className="mr-2 bg-white"
                  />
                </motion.div>

                <motion.button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, ...springTransition }}
                  onClick={() => setIsVisible(!isVisible)}
                  aria-label={
                    isVisible ? "Hide card details" : "Show card details"
                  }
                >
                  {isVisible ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </motion.button>
              </div>

              <motion.div
                className="mt-2 text-xl font-medium tracking-wider text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {isVisible ? cardData.number : getMaskedNumber(cardData.number)}
              </motion.div>

              <div className="mt-2 flex justify-between text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: CARD_ANIMATION_DURATION }}
                >
                  <div className="text-sm opacity-80">Member Name</div>
                  <div className="font-medium">{cardData.holder}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: CARD_ANIMATION_DURATION }}
                >
                  <div className="text-sm opacity-80">Valid Until</div>
                  <div className="font-medium">
                    {isVisible ? cardData.expiry : "**/**"}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
