"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
export default function ContactForm({ staggerChildren, fadeIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [proofOfIdFile, setProofOfIdFile] = useState(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState(null);
  const [isDraggingId, setIsDraggingId] = useState(false);
  const [isDraggingAddress, setIsDraggingAddress] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Use useEffect to mark when component is mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);

    // Add files to FormData if they exist
    if (proofOfIdFile) {
      formData.set("proofofID", proofOfIdFile);
    }

    if (proofOfAddressFile) {
      formData.set("proofofAddress", proofOfAddressFile);
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData, // Send as FormData instead of JSON
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

  // Handle file drop for Proof of ID
  const handleIdDrop = useCallback((e) => {
    e.preventDefault();
    setIsDraggingId(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Check file type
      if (file.type.match("image/jpeg|image/png|application/pdf")) {
        setProofOfIdFile(file);
      } else {
        setError("Please upload a valid file type (JPEG, PNG, or PDF)");
      }
    }
  }, []);

  // Handle file drop for Proof of Address
  const handleAddressDrop = useCallback((e) => {
    e.preventDefault();
    setIsDraggingAddress(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Check file type
      if (file.type.match("image/jpeg|image/png|application/pdf")) {
        setProofOfAddressFile(file);
      } else {
        setError("Please upload a valid file type (JPEG, PNG, or PDF)");
      }
    }
  }, []);

  // Handle file input change for Proof of ID
  const handleIdChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProofOfIdFile(e.target.files[0]);
    }
  };

  // Handle file input change for Proof of Address
  const handleAddressChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProofOfAddressFile(e.target.files[0]);
    }
  };

  // Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (setDragging) => (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (setDragging) => (e) => {
    e.preventDefault();
    setDragging(false);
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

          {/* Proof of ID Upload */}
          <div>
            <label
              htmlFor="proofofID"
              className="block text-sm font-medium text-white"
            >
              Proof of ID
            </label>
            <div
              className={`mt-1 border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                isDraggingId
                  ? "border-green-500 bg-green-50 bg-opacity-10"
                  : "border-gray-300"
              }`}
              onDragOver={isMounted ? handleDragOver : undefined}
              onDragEnter={
                isMounted ? handleDragEnter(setIsDraggingId) : undefined
              }
              onDragLeave={
                isMounted ? handleDragLeave(setIsDraggingId) : undefined
              }
              onDrop={isMounted ? handleIdDrop : undefined}
              onClick={
                isMounted
                  ? () => document.getElementById("proofofID").click()
                  : undefined
              }
            >
              <input
                type="file"
                name="proofofID"
                id="proofofID"
                accept="image/jpeg,image/png,application/pdf"
                onChange={handleIdChange}
                className={isMounted ? "hidden" : "opacity-0 absolute"}
                style={!isMounted ? { width: "1px", height: "1px" } : {}}
              />
              {proofOfIdFile ? (
                <p className="text-sm text-white">
                  File selected: {proofOfIdFile.name}
                </p>
              ) : (
                <p className="text-sm text-gray-300">
                  Drag and drop your file here, or click to select
                  <br />
                  <span className="text-xs">(JPEG, PNG, or PDF)</span>
                </p>
              )}
            </div>
          </div>

          {/* Proof of Address Upload */}
          <div>
            <label
              htmlFor="proofofAddress"
              className="block text-sm font-medium text-white"
            >
              Proof of Address
            </label>
            <div
              className={`mt-1 border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                isDraggingAddress
                  ? "border-green-500 bg-green-50 bg-opacity-10"
                  : "border-gray-300"
              }`}
              onDragOver={isMounted ? handleDragOver : undefined}
              onDragEnter={
                isMounted ? handleDragEnter(setIsDraggingAddress) : undefined
              }
              onDragLeave={
                isMounted ? handleDragLeave(setIsDraggingAddress) : undefined
              }
              onDrop={isMounted ? handleAddressDrop : undefined}
              onClick={
                isMounted
                  ? () => document.getElementById("proofofAddress").click()
                  : undefined
              }
            >
              <input
                type="file"
                name="proofofAddress"
                id="proofofAddress"
                accept="image/jpeg,image/png,application/pdf"
                onChange={handleAddressChange}
                className={isMounted ? "hidden" : "opacity-0 absolute"}
                style={!isMounted ? { width: "1px", height: "1px" } : {}}
              />
              {proofOfAddressFile ? (
                <p className="text-sm text-white">
                  File selected: {proofOfAddressFile.name}
                </p>
              ) : (
                <p className="text-sm text-gray-300">
                  Drag and drop your file here, or click to select
                  <br />
                  <span className="text-xs">(JPEG, PNG, or PDF)</span>
                </p>
              )}
            </div>
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
