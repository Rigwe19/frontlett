"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "./ui/button"
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react'

interface TeamMember {
    id: number
    name: string
    role: string
    experience: string
    skillLevel: number
    slotsLeft: number
    lastActive: string
    image: string
}

const TeamMembers: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [swiper, setSwiper] = useState<any>(null);
    const [visibleCount, setVisibleCount] = useState(3)

    const teamMembers: TeamMember[] = [
        {
            id: 1,
            name: "Akeem Paul",
            role: "UI Designer",
            experience: "0-4 years (Exp.)",
            skillLevel: 3,
            slotsLeft: 1,
            lastActive: "1 week ago",
            image: "/images/team/akeem.webp",
        },
        {
            id: 2,
            name: "Rita Tora",
            role: "Illustrator",
            experience: "0-6 years (Exp.)",
            skillLevel: 4,
            slotsLeft: 2,
            lastActive: "3 weeks ago",
            image: "/images/team/rita.webp",
        },
        {
            id: 3,
            name: "Olanna Adani",
            role: "Content creator",
            experience: "0-2 years (Exp.)",
            skillLevel: 2,
            slotsLeft: 3,
            lastActive: "4 weeks ago",
            image: "/images/team/olanna.webp",
        },
        {
            id: 4,
            name: "Josh Oseni",
            role: "Full Stack Developer",
            experience: "2-5 years (Exp.)",
            skillLevel: 5,
            slotsLeft: 2,
            lastActive: "2 days ago",
            image: "/images/team/josh.webp",
        },
        {
            id: 5,
            name: "Andrew Johnson",
            role: "Project Manager",
            experience: "3-8 years (Exp.)",
            skillLevel: 4,
            slotsLeft: 1,
            lastActive: "5 days ago",
            image: "/images/team/maladiva.webp",
        },
    ]


    const maxIndex = teamMembers.length - visibleCount


    const handlePrev = () => {
        swiper.slidePrev()
    }

    const handleNext = () => {
        swiper.slideNext()
    }

    const handleDotClick = (index: number) => {
        swiper.slideTo(index)
    }

    const renderSkillLevel = (level: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => <div key={i} className={`w-4 h-4 rounded-full ${i < level ? "bg-blue-500" : "bg-blue-200"}`} />)
    }

    return (
        <section className="w-full bg-blue-50 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        Our Team
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4">
                        How People{" "}
                        <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1">
                            Work on Frontlett
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join our talented team of professionals</p>
                </div>
                <div className="relative overflow-hidden">
                    <Swiper 
                    onSwiper={swiper=>setSwiper(swiper)}
                    onSlideChange={e=>setCurrentIndex(e.realIndex)}
                    spaceBetween={10} breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 3 }
                    }} slidesPerGroup={1}>
                        {teamMembers.map((member) => <SwiperSlide key={member.id}>
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full max-w-sm">
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={member.image || "/placeholder.svg"}
                                        alt={member.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-blue-600 mb-4">{member.role}</p>

                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600 text-sm">{member.experience}</span>
                                        <div className="flex space-x-1">{renderSkillLevel(member.skillLevel)}</div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-blue-600 text-sm">{member.slotsLeft} slot(s) left</span>
                                        <span className="text-gray-500 text-sm">{member.lastActive}</span>
                                    </div>

                                    <div className="flex justify-between items-center mb-4">
                                        <button className="flex items-center text-blue-600 text-sm">
                                            <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                            Send to a friend
                                        </button>

                                        <button className="flex items-center text-blue-600 text-sm">
                                            <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                            </svg>
                                            Share
                                        </button>
                                    </div>

                                    <Button className="w-full text-center">
                                        Hire
                                    </Button>
                                </div>
                            </div>
                        </SwiperSlide>)}
                    </Swiper>

                    <div className="flex justify-center items-center mt-12 space-x-2">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentIndex === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                } transition-colors`}
                            aria-label="Previous team members"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        <div className="flex space-x-2">
                            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? "w-8 bg-blue-500" : "bg-blue-200 hover:bg-blue-300"
                                        } transition-all`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentIndex >= maxIndex
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                } transition-colors`}
                            aria-label="Next team members"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex justify-center mt-12">
                        <Button>
                            View All Team Members
                            <svg
                                className="ml-2 w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamMembers

