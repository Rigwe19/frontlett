"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQItem {
    id: number
    question: string
    answer: string
}

const FAQSection: React.FC = () => {
    const [openItem, setOpenItem] = useState<number | null>(null)

    const faqItems: FAQItem[] = [
        {
            id: 1,
            question: "Does Frontlett actively seek media coverage?",
            answer:
                "While we are proud of our achievements, our primary focus is on delivering exceptional results for our clients. Media coverage is a natural outcome of our dedication to innovation and excellence in the industry.",
        },
        {
            id: 2,
            question: "Can I share Frontlett's media coverage with my team or network?",
            answer:
                "We encourage you to share our media coverage with your team and network. You can find shareable links to our media mentions on our Press page, or contact our marketing team for official press kits and materials.",
        },
        {
            id: 3,
            question: "How can I stay updated on Frontlett's latest news and features?",
            answer:
                "You can stay updated by subscribing to our monthly newsletter, following us on social media platforms, or visiting our blog regularly. We also send important updates directly to our clients via email.",
        },
        {
            id: 4,
            question: "How often is Frontlett featured in the news?",
            answer:
                "Frontlett is regularly featured in industry publications and news outlets. The frequency varies, but we typically appear in media several times per quarter, especially when we launch new features or announce significant partnerships.",
        },
        {
            id: 5,
            question: "Does Frontlett's media coverage include client success stories?",
            answer:
                "Yes, with client permission, we often highlight success stories in our media coverage. These case studies demonstrate real-world applications of our platform and the tangible results our clients have achieved.",
        },
    ]

    const toggleItem = (id: number) => {
        setOpenItem(openItem === id ? null : id)
    }

    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-3xl mx-auto px-4 flex flex-col gap-12">
                <h2 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4">
                    Frequently Ask{" "}
                    <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1">
                        Questions
                    </span>
                </h2>

                <div className="grid grid-cols-1 gap-6">
                    {faqItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                className="w-full px-6 py-4 text-left flex cursor-pointer gap-8 items-center focus:outline-none"
                                onClick={() => toggleItem(item.id)}
                                aria-expanded={openItem === item.id}
                                aria-controls={`faq-answer-${item.id}`}
                            >
                                <span className="flex-shrink-0 ml-2">
                                    {openItem === item.id ? (
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    )}
                                </span>
                                <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                            </button>

                            <AnimatePresence initial={false}>
                                {openItem === item.id && (
                                    <motion.div
                                        id={`faq-answer-${item.id}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                            transition: {
                                                height: {
                                                    duration: 0.3,
                                                },
                                                opacity: {
                                                    duration: 0.25,
                                                    delay: 0.15,
                                                },
                                            },
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: {
                                                height: {
                                                    duration: 0.3,
                                                },
                                                opacity: {
                                                    duration: 0.25,
                                                },
                                            },
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div></div>
                                        <div className="px-6 pb-4 text-gray-600">{item.answer}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center justify-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full">
                        <span>Can't find the answer you're looking for?</span>
                        <a href="#" className="ml-2 font-medium text-blue-600 hover:text-blue-800 transition-colors">
                            Tell us more <span aria-hidden="true">›</span>
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default FAQSection

