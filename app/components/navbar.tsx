"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router"

const Navbar: React.FC = () => {
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  return (
    <nav className="w-full h-[64px] bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="h-full w-full mx-auto flex items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <img src="./logo.png" className="h-[48px]" alt="" />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button
              className="flex items-center text-sm font-semibold text-gray-800"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              FEATURES
              <svg className="ml-1 w-2.5 h-2.5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {featuresOpen && (
              <div className="absolute top-full left-0 w-48 bg-white rounded shadow-lg py-2 mt-2 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Share Stafing
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Job Sharing
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  HR Account Officer
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Reward System
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Hire Fulltime
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Move to Virtualting
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Virtualancer
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Moonlighting
                </a>
              </div>
            )}
          </div>

          <button className="text-sm font-semibold text-gray-800">PRICING</button>

          <div className="relative group">
            <button
              className="flex items-center text-sm font-semibold text-gray-800"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              SOLUTIONS
              <svg className="ml-1 w-2.5 h-2.5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {solutionsOpen && (
              <div className="absolute top-full left-0 w-48 bg-white rounded shadow-lg py-2 mt-2 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Startup
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Retail
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Real Estate
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Hospitality
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Beauty & Cosmetics
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Manufacturing
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Blue Collar
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Corporation & Gov
                </a>
              </div>
            )}
          </div>

          <button className="text-sm font-semibold text-gray-800">FAQ</button>

          <button className="text-sm font-semibold text-gray-800">COMPANY</button>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3">
          <button className="text-sm hidden md:flex w-[120px] h-[42px] justify-center items-center gap-[4px] rounded-[12px] bg-[#C8E2FF]">
            GET A WORK DATA -ID
          </button>
          <button className="text-sm hidden md:flex w-[100px] h-[42px] justify-center items-center gap-[4px] rounded-[12px] bg-[#FFEEC8]">
            PITCH DECK
          </button>
          <Link to="/onboarding/get-started" className="text-sm text-white font-bold flex w-[130px] h-[43px] p-[11px] justify-center items-center gap-[10px] rounded-[12px] bg-[#1279E0]">
            Login/Register
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden flex flex-col justify-between w-6 h-5">
            <span className="w-full h-0.5 bg-gray-800"></span>
            <span className="w-full h-0.5 bg-gray-800"></span>
            <span className="w-full h-0.5 bg-gray-800"></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

