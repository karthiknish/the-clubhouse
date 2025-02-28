"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { motion } from "framer-motion";

// Client-only wrapper component
const ClientOnly = ({ children, fallback = null }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
};

export function FeaturesSection() {
  const features = [
    {
      title: "Exclusive Benefits",
      description:
        "Access a curated selection of premium benefits and experiences from world-class brands and partners.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 md:col-span-4 lg:col-span-4 border-b md:border-r dark:border-neutral-800",
    },
    {
      title: "Business Networking",
      description:
        "Connect and collaborate with other SMEs to generate valuable business opportunities and partnerships.",
      skeleton: (
        <ClientOnly
          fallback={
            <div className="h-60 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"></div>
          }
        >
          <SkeletonTwo />
        </ClientOnly>
      ),
      className:
        "col-span-1 md:col-span-2 lg:col-span-2 border-b dark:border-neutral-800",
    },
    {
      title: "Professional Development",
      description:
        "Access exclusive workshops, mentorship programs and skill-building resources to accelerate your growth",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-r dark:border-neutral-800",
    },
    {
      title: "Grow Your Network",
      description:
        "Expand your professional connections and build valuable relationships with other UK business leaders and entrepreneurs.",
      skeleton: <SkeletonFour />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-none",
    },
  ];
  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Everything you need to know about Clubhouse
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Clubhouse provides all the tools you need to make your business
          thrive.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ children, className }) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-4 px-1 gap-5 h-full">
      <div className="w-3/4 p-3 mx-auto bg-white group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-1">
          <Image
            src="/app-screen.png"
            alt="Club dashboard preview"
            width={600}
            height={600}
            className="h-full w-full aspect-square top-8 object-contain object-left-top"
          />
        </div>
      </div>
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <Image
      src="/workshop.jpg"
      alt="Demo video preview"
      width={800}
      height={800}
      className="h-full w-full aspect-square object-cover object-center rounded-sm"
    />
  );
};

export const SkeletonTwo = () => {
  const images = [
    "https://lirp.cdn-website.com/93173ee8/dms3rep/multi/opt/CLUBHOUSE+%284%29-660w.jpg",
    "https://lirp.cdn-website.com/93173ee8/dms3rep/multi/opt/2595+%281%29-1920w.jpg",
    "https://lirp.cdn-website.com/93173ee8/dms3rep/multi/opt/144319-1920w.jpg",
    "https://lirp.cdn-website.com/93173ee8/dms3rep/multi/opt/2148817070-1920w.jpg",
    "https://lirp.cdn-website.com/93173ee8/dms3rep/multi/opt/CLUBHOUSE+%289%29-1920w.jpg",
    "https://irp.cdn-website.com/93173ee8/dms3rep/multi/CLUBHOUSE+%2810%29.jpg",
    "https://irp.cdn-website.com/93173ee8/dms3rep/multi/CLUBHOUSE+%288%29.jpg",
    "https://irp.cdn-website.com/93173ee8/dms3rep/multi/14232.jpg",
    "https://irp.cdn-website.com/md/pexels/dms3rep/multi/lamborghini-brno-racing-car-automobiles-39501.jpeg",
    "https://irp.cdn-website.com/md/pexels/dms3rep/multi/pexels-photo-2506988.jpeg",
    "https://irp.cdn-website.com/93173ee8/dms3rep/multi/520.jpg",
    "https://irp.cdn-website.com/93173ee8/dms3rep/multi/modern-living-room-with-elegant-decor-comfortable-sofa-generative-ai.jpg",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };

  // Generate rotations directly without useEffect
  const rotations = Array(images.length * 3)
    .fill(0)
    .map(() => Math.random() * 20 - 10);

  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{
              rotate: rotations[idx],
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="club event"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.slice(3).map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: rotations[idx + images.length],
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="club event"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row -ml-20">
        {images.slice(6).map((image, idx) => (
          <motion.div
            key={"images-third" + idx}
            style={{
              rotate: rotations[idx + images.length * 2],
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="club event"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
    >
      <Image
        src="/uk-map.png"
        alt="Global network"
        width={200}
        height={200}
        className="h-full w-full bg-transparent object-contain object-center rounded-sm"
      />
    </motion.div>
  );
};
