import type { FC } from "react"
import Button from "./ui/button"

const NewsFeature: FC = () => {
    const newsLogos = [
        {
            name: "Vanguard",
            logo: "/images/news/vanguard.png",
            alt: "Vanguard logo",
        },
        {
            name: "Pulse.ng",
            logo: "/images/news/pulse.png",
            alt: "Pulse.ng logo",
        },
        {
            name: "Sahara Reporters",
            logo: "/images/news/sahara.png",
            alt: "Sahara Reporters logo",
        },
        {
            name: "The Sun",
            logo: "/images/news/sun.png",
            alt: "The Sun logo",
        },
        {
            name: "Punch",
            logo: "/images/news/punch.png",
            alt: "Punch logo",
        },
        {
            name: "NigerianEye",
            logo: "/images/news/eye.png",
            alt: "NigerianEye logo",
        },
    ]

    return (
        <section className="w-full bg-blue-50 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        In The News
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4">
                        Featured by{" "}
                        <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1">
                            Reputable News
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Recognized for Excellence</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8 mb-12 max-w-7xl mx-auto">
                    <p className="text-blue-800 text-lg md:text-xl leading-relaxed mb-4">
                        "Frontlett has been featured in leading publications for our innovative approach to team building and
                        project delivery. Our work has been recognized by TechCrunch, Forbes, and Business Insider."
                    </p>
                    <p className="text-right text-blue-500 font-medium">- Industry Recognition</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                    {newsLogos.map((logo, index) => (
                        <div key={index} className={`w-32 md:w-40 h-16 flex items-center justify-center ${index!==5?'bg-white':'bg-black'} rounded-lg p-4`}>
                            <img
                                src={logo.logo || "/placeholder.svg"}
                                alt={logo.alt}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button>
                        Read More
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
        </section>
    )
}

export default NewsFeature
