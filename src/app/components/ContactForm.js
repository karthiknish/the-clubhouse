"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
export default function ContactForm({ staggerChildren, fadeIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      companyName: formData.get("companyName"),
      companyNumber: formData.get("companyNumber"),
      companyAddress: formData.get("companyAddress"),
      companyWebsite: formData.get("companyWebsite"),
      proofofID: formData.get("proofofID"),
      proofofAddress: formData.get("proofofAddress"),
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      router.push("/thank-you");
    } catch (err) {
      setError(err.message || "Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="join-form" className="bg-[#393F37] text-white py-16 px-4">
      <motion.div
        className="max-w-xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className="text-3xl font-bold mb-8" variants={fadeIn}>
          Enquire about membership
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-white"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              pattern="[0-9]*"
              className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4"
            />
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-white"
            >
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              required
              className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4"
            />
          </div>

          <div>
            <label
              htmlFor="companyNumber"
              className="block text-sm font-medium text-white"
            >
              Company Registration Number
            </label>
            <input
              type="text"
              name="companyNumber"
              id="companyNumber"
              required
              pattern="[0-9]*"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4"
            />
          </div>

          <div>
            <label
              htmlFor="companyAddress"
              className="block text-sm font-medium text-white"
            >
              Company Registered Address
            </label>
            <textarea
              name="companyAddress"
              id="companyAddress"
              rows={2}
              required
              className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4"
            />
          </div>

          <div>
            <label
              htmlFor="companyWebsite"
              className="block text-sm font-medium text-white"
            >
              Company Website
            </label>
            <input
              type="text"
              name="companyWebsite"
              id="companyWebsite"
              required
              className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-4"
            />
          </div>

          <div>
            <label
              htmlFor="proofofID"
              className="block text-sm font-medium text-white"
            >
              Proof of ID
            </label>
            <input type="file" name="proofofID" id="proofofID" />
          </div>

          <div>
            <label
              htmlFor="proofofAddress"
              className="block text-sm font-medium text-white"
            >
              Proof of Address
            </label>
            <input type="file" name="proofofAddress" id="proofofAddress" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-white text-[#393F37]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Join Now"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
