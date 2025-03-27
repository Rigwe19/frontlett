"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "./ui/button"

interface HelpModalProps {
    delayTime?: number
}

const HelpModal: React.FC<HelpModalProps> = ({ delayTime = 3000 }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Show modal after specified delay
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, delayTime)

        return () => clearTimeout(timer)
    }, [delayTime])

    const closeModal = () => {
        setIsVisible(false)
    }

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isVisible])

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{
                                scale: 1,
                                y: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25,
                                },
                            }}
                            exit={{
                                scale: 0.9,
                                y: 20,
                                opacity: 0,
                                transition: { duration: 0.2 },
                            }}
                        >
                            <div className="relative bg-gradient-to-br from-blue-900 via-30% via-blue-800 to-yellow-400 p-8 md:p-12 flex flex-col md:flex-row items-center">
                                {/* Close button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>

                                {/* Content */}
                                <div className="md:w-4/5 mb-8 md:mb-0 md:pr-8">
                                    <motion.h2
                                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: 0.2, duration: 0.4 },
                                        }}
                                    >
                                        Can't find what you're looking for?
                                    </motion.h2>

                                    <motion.p
                                        className="text-white/90 text-lg mb-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: 0.3, duration: 0.4 },
                                        }}
                                    >
                                        We're here to help you.
                                    </motion.p>

                                    <motion.div
                                        className="flex flex-col sm:flex-row gap-4 w-full"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: 0.4, duration: 0.4 },
                                        }}
                                    >
                                        <Button className="w-full">
                                            Request a callback
                                        </Button>
                                        <Button className="bg-white text-black w-full hover:bg-gray-200">
                                            Schedule a free demo
                                        </Button>
                                    </motion.div>

                                    <motion.p
                                        className="text-white/80 mt-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: 0.5, duration: 0.4 },
                                        }}
                                    >
                                        Still not sure?
                                        <br />
                                        Call us at 070 123 333 90
                                    </motion.p>
                                </div>

                            </div>
                            {/* Illustration */}
                            <motion.div
                                className="md:max-w-[360px] absolute -bottom-14 -right-16 hidden md:block"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: 0.6, duration: 0.5 },
                                }}
                            >
                                <img
                                    src="/images/modal-image.png"
                                    alt="Support representative with headset"
                                    className="w-full mx-auto"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default HelpModal

