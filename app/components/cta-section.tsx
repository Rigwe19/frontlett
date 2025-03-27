import type React from "react"

const CTASection: React.FC = () => {
    return (
        <section className="w-full bg-blue-50 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="relative">
                        {/* Blue top border */}
                        {/* <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div> */}

                        <div className="flex flex-col md:flex-row relative w-full aspect-video border-t-4 border-t-blue-500">
                            {/* Left content */}
                            <div className="md:w-1/2">

                            </div>
                            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 lg:p-16 ">
                                <div className="inline-block px-4 py-1.5 w-fit bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                                    Get Started Today
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4 max-w-[674px]">
                                    Ready to{" "}
                                    <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1">
                                        Transform
                                    </span>
                                    Your Company Workforce?
                                </h2>

                                <p className="md:text-gray-600 text-black/80 text-lg mb-8 max-w-xl">
                                    Join Frontlett Virtualizing today and experience the future of workforce management. Our platform is
                                    designed specifically for all teams like yours.
                                </p>

                                <div className="flex flex-row gap-4 mb-10">
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-blue-600"
                                    >
                                        Get Started
                                    </a>

                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center border border-blue-500 text-blue-600 px-8 py-3 rounded-lg font-medium transition-colors hover:bg-blue-50"
                                    >
                                        Contact Sales
                                    </a>
                                </div>

                                <div className="flex items-center">
                                    <div className="flex -space-x-2 mr-4">
                                        {/* {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                                                <img
                                                    src={`/placeholder.svg?height=32&width=32`}
                                                    alt={`User ${i}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))} */}
                                        <div className="flex mr-3">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`w-8 h-8 rounded-full border-2 border-white bg-gray-300 ${i > 1 ? "-ml-2.5" : ""}`}
                                                    style={{ backgroundColor: `hsl(${i * 60}, 70%, 60%)` }}
                                                />
                                            ))}
                                        <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium -ml-2.5">
                                            +50
                                        </div>
                                        </div>
                                    </div>

                                    <p className="text-blue-700 font-medium">Joined by 50+ industrial companies in the last month</p>
                                </div>
                            </div>

                            {/* Right image/background */}
                            <div className="w-full aspect-square md:w-1/2 bg-gray-100">
                                <div
                                    className="h-full w-full bg-cover bg-center opacity-20"
                                    style={{
                                        backgroundImage: `url('/images/handshake.webp')`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection

