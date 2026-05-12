// LandingPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-blue-500">
          NotesApp
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition"
          >
            Register
          </button>
        </div>
      </nav>


      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-6xl font-bold mb-6">
          Organize Your Notes
          <span className="text-blue-500"> Effortlessly</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          Store, manage and access your personal notes securely from anywhere.
          Fast, simple and built for productivity.
        </p>

        <div className="flex gap-5">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-lg font-semibold transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-xl border border-gray-700 hover:bg-gray-800 text-lg transition"
          >
            Login
          </button>
        </div>

      </div>


      {/* Footer */}
      <footer className="text-center py-5 border-t border-gray-800 text-gray-500">
        Built with React + Tailwind CSS
      </footer>

    </div>
  );
}

export default LandingPage;