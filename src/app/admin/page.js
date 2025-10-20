"use client";

import { useEffect, useState } from "react";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rawContent, setRawContent] = useState("{}");
  const [statusMessage, setStatusMessage] = useState("" );
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated]);

  const fetchContent = async () => {
    try {
      setIsFetching(true);
      const response = await fetch("/api/content");
      if (!response.ok) {
        throw new Error("Failed to load content");
      }
      const data = await response.json();
      setRawContent(JSON.stringify(data, null, 2));
      setStatusMessage("Content loaded.");
    } catch (error) {
      console.error(error);
      setStatusMessage("Unable to load content. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatusMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      setIsAuthenticated(true);
      setStatusMessage("Logged in successfully.");
    } catch (error) {
      setStatusMessage(error.message || "Login failed.");
    }
  };

  const handleSave = async () => {
    setStatusMessage("");
    setIsSaving(true);

    try {
      const parsed = JSON.parse(rawContent);
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      if (!response.ok) {
        throw new Error("Unable to save content");
      }

      setStatusMessage("Content saved successfully.");
    } catch (error) {
      setStatusMessage(
        error instanceof SyntaxError
          ? "Invalid JSON. Please correct and try again."
          : error.message || "Save failed."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0] px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-xl"
        >
          <div>
            <h1 className="text-2xl font-semibold text-[#393F37]">Admin Login</h1>
            <p className="mt-2 text-sm text-[#55594F]">
              Enter the admin credentials to edit page content.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#393F37]" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#d7d2c9] px-4 py-3 text-[#393F37] focus:border-[#393F37] focus:outline-none"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#393F37]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#d7d2c9] px-4 py-3 text-[#393F37] focus:border-[#393F37] focus:outline-none"
              autoComplete="current-password"
              required
            />
          </div>
          {statusMessage ? (
            <p className="text-sm text-[#8a4d4d]">{statusMessage}</p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-full bg-[#393F37] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#4a5246]"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-16 px-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-[#393F37]">Content Management</h1>
          <p className="text-sm text-[#55594F]">
            Edit the JSON below to update page content. Click save to persist your changes.
          </p>
          {statusMessage ? (
            <span className="text-sm text-[#55594F]">{statusMessage}</span>
          ) : null}
        </header>
        <section className="rounded-3xl bg-white p-6 shadow">
          <textarea
            value={rawContent}
            onChange={(event) => setRawContent(event.target.value)}
            className="h-[32rem] w-full resize-none rounded-2xl border border-[#d7d2c9] p-4 font-mono text-sm text-[#1f2620] focus:border-[#393F37] focus:outline-none"
            spellCheck={false}
            disabled={isFetching}
          />
        </section>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={fetchContent}
            disabled={isFetching || isSaving}
            className="rounded-full border border-[#393F37] px-6 py-3 text-sm font-semibold text-[#393F37] transition hover:bg-[#393F37] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? "Refreshing..." : "Reload"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isFetching}
            className="rounded-full bg-[#393F37] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a5246] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
