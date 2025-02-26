"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FeaturesSection } from "./components/ui/features";
import { CardSection } from "./components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ContactForm from "./components/ContactForm";
// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  return (
    <main>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#393F37] to-[#4a5246] text-white py-20 px-4">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeIn}
            >
              Connect, Innovate, Thrive - Your Gateway to Exclusive World-Class
              Opportunities
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-[#d1d5d0]"
              variants={fadeIn}
            >
              Welcome to Clubhouse, and executive business club catering for the
              UK SME marketplace. Our in-house rewards program is designed for
              innovative minds shaping the world.
            </motion.p>
            <motion.button
              className="bg-white text-[#393F37] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#f5f5f5] transition-colors"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .getElementById("join-form")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Join Today
            </motion.button>
          </motion.div>
        </section>

        {/* Value Propositions */}
        <section className="py-20 px-4 bg-gradient-to-b from-white to-[#f0f2ef]">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div
              className="grid md:grid-cols-3 gap-12"
              variants={fadeIn}
            >
              <motion.div
                className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#393F37] to-[#4a5246] rounded-xl rotate-45 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#393F37] mt-6 mb-4">
                  Enhance Growth Within Your Business
                </h3>
                <p className="text-[#5c635a] leading-relaxed">
                  Access premium resources, strategic partnerships, and tailored
                  growth opportunities.
                </p>
              </motion.div>

              <motion.div
                className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#393F37] to-[#4a5246] rounded-xl rotate-45 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#393F37] mt-6 mb-4">
                  Expert Knowledge Hub
                </h3>
                <p className="text-[#5c635a] leading-relaxed">
                  Get exclusive access to industry insights, masterclasses, and
                  cutting-edge business strategies
                </p>
              </motion.div>

              <motion.div
                className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#393F37] to-[#4a5246] rounded-xl rotate-45 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white -rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#393F37] mt-6 mb-4">
                  Elite Network Access
                </h3>
                <p className="text-[#5c635a] leading-relaxed">
                  Connect with industry leaders, mentors, and like-minded
                  entrepreneurs in our curated community
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
        <FeaturesSection />
        <CardSection />
        {/* Features Section */}
        <section className="py-20 bg-white">
          <motion.div
            className="max-w-6xl mx-auto px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              className="text-4xl text-[#393F37] font-bold text-center mb-16"
              variants={fadeIn}
            >
              Benefits
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div className="space-y-8" variants={fadeIn}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#393F37] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#393F37] font-semibold mb-2">
                      Club Savings
                    </h3>
                    <p className="text-[#5c635a]">
                      Exclusive discounts and special offers for members across
                      our partner network.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#393F37] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#393F37] font-semibold mb-2">
                      Airport Lounge Access
                    </h3>
                    <p className="text-[#5c635a]">
                      Complimentary access to premium airport lounges worldwide.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#393F37] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#393F37] font-semibold mb-2">
                      Golf Pass
                    </h3>
                    <p className="text-[#5c635a]">
                      Access to exclusive golf courses and special member rates.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#393F37] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#393F37] font-semibold mb-2">
                      Clubhouse Education
                    </h3>
                    <p className="text-[#5c635a]">
                      Access to educational resources and professional
                      development programs.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div className="space-y-8" variants={fadeIn}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#393F37] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#393F37] font-semibold mb-2">
                      SEO & Content Marketing
                    </h3>
                    <p className="text-[#5c635a]">
                      Expert guidance and tools for digital marketing success.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#393F37] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#393F37] font-semibold mb-2">
                      Custom Reward Program
                    </h3>
                    <p className="text-[#5c635a]">
                      Personalised rewards and benefits tailored to your
                      preferences.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#393F37] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#393F37] font-semibold mb-2">
                      Marketing & Lead Generation
                    </h3>
                    <p className="text-[#5c635a]">
                      Comprehensive marketing support and lead generation
                      strategies.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#393F37] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#393F37] font-semibold mb-2">
                      Club Wellbeing
                    </h3>
                    <p className="text-[#5c635a]">
                      Access to wellness programs and health-focused
                      initiatives.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#393F37] text-white">
          <motion.div
            className="max-w-6xl mx-auto px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div variants={fadeIn}>
                <div className="text-4xl font-bold mb-2">2500+</div>
                <div className="text-[#d1d5d0]">Active Members</div>
              </motion.div>
              <motion.div variants={fadeIn}>
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-[#d1d5d0]">Events Yearly</div>
              </motion.div>
              <motion.div variants={fadeIn}>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-[#d1d5d0]">Partner Brands</div>
              </motion.div>
              <motion.div variants={fadeIn}>
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-[#d1d5d0]">Global Locations</div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <motion.div
            className="max-w-4xl mx-auto px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              className="text-4xl text-[#393F37] font-bold text-center mb-12"
              variants={fadeIn}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div className="space-y-6" variants={staggerChildren}>
              {[
                {
                  q: "What is included in the membership?",
                  a: "Our membership includes access to exclusive events, networking opportunities, business resources, partner discounts, and our global community of professionals.",
                },
                {
                  q: "How much does membership cost?",
                  a: "We offer various membership tiers tailored to different needs and budgets. Contact us for detailed pricing information.",
                },
                {
                  q: "Can I try before committing?",
                  a: "Yes! We offer guest passes to selected events. Contact us to learn more about experiencing Clubhouse firsthand.",
                },
                {
                  q: "How do I maximise my membership?",
                  a: "Our dedicated membership team will help you create a personalised plan to make the most of your benefits and connections.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-[#f0f2ef] rounded-lg p-6 cursor-pointer"
                  variants={fadeIn}
                  initial={{ height: "auto" }}
                  animate={{ height: "auto" }}
                  onClick={(e) => {
                    const content = e.currentTarget.querySelector("p");
                    const arrow = e.currentTarget.querySelector("svg");
                    const isOpen = content.style.maxHeight !== "0px";

                    // Toggle content
                    content.style.maxHeight = isOpen
                      ? "0px"
                      : `${content.scrollHeight}px`;

                    // Animate arrow
                    arrow.style.transform = isOpen
                      ? "rotate(0deg)"
                      : "rotate(180deg)";
                  }}
                >
                  <h3 className="text-xl text-[#393F37] font-semibold mb-2 flex justify-between items-center">
                    {faq.q}
                    <svg
                      className="w-6 h-6 transition-transform duration-300"
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
                  </h3>
                  <p
                    className="text-[#5c635a] overflow-hidden transition-all duration-300"
                    style={{ maxHeight: "0px" }}
                  >
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section - Add before the Contact Form */}
        <section className="py-20 bg-gradient-to-r from-[#393F37] to-[#4a5246] text-white">
          <motion.div
            className="max-w-4xl mx-auto text-center px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 className="text-4xl font-bold mb-6" variants={fadeIn}>
              Ready to Join Our Community?
            </motion.h2>
            <motion.p className="text-xl mb-8 text-[#d1d5d0]" variants={fadeIn}>
              Take the first step towards transforming your professional journey
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <button
                onClick={() => {
                  document
                    .getElementById("join-form")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-[#393F37] px-8 py-4 rounded-full font-semibold hover:bg-[#f5f5f5] transition-colors"
              >
                Apply Now
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Benefits Section */}

        {/* Testimonials */}
        <section className="py-16 px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              className="text-3xl font-bold text-center mb-12 text-[#393F37]"
              variants={fadeIn}
            >
              What Our Members Say
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerChildren}
            >
              <motion.div
                className="bg-white text-[#5c635a] p-8 rounded-lg shadow-sm"
                variants={fadeIn}
                whileHover={{ y: -10 }}
              >
                <p className="italic mb-4">
                  "Clubhouse has opened doors I never even knew existed. The
                  quality of connections I've made here is unmatched."
                </p>
                <p className="font-semibold">- S.M</p>
              </motion.div>
              <motion.div
                className="bg-white text-[#5c635a] p-8 rounded-lg shadow-sm"
                variants={fadeIn}
                whileHover={{ y: -10 }}
              >
                <p className="italic mb-4">
                  "The resources and support available through Clubhouse are
                  invaluable. The curated events and mentorship opportunities
                  have enhanced my skills."
                </p>
                <p className="font-semibold">- A.P</p>
              </motion.div>
              <motion.div
                className="bg-white text-[#5c635a] p-8 rounded-lg shadow-sm"
                variants={fadeIn}
                whileHover={{ y: -10 }}
              >
                <p className="italic mb-4">
                  "Clubhouse is so much more than professional networking. I've
                  built lasting friendships and experienced things I never would
                  have otherwise."
                </p>
                <p className="font-semibold">- M.R</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Form */}
        <ContactForm staggerChildren={staggerChildren} />
      </div>
    </main>
  );
}
