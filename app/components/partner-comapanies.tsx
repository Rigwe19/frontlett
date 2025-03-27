import type { FC } from "react"
import Button from "./ui/button"

const PartnerCompanies: FC = () => {
    const partners = [
        {
            name: "Gartner Peer Insights",
            logo: "/images/companies/gartner.png",
            alt: "Gartner Peer Insights logo",
        },
        {
            name: "TrustRadius",
            logo: "/images/companies/trust.png",
            alt: "TrustRadius logo",
        },
        {
            name: "G2 Crowd",
            logo: "/images/companies/g2.png",
            alt: "G2 Crowd logo",
        },
        {
            name: "Stutern",
            logo: "/images/companies/stutern.png",
            alt: "Stutern logo",
        },
        {
            name: "Andela",
            logo: "/images/companies/andela.png",
            alt: "Andela logo",
        },
        {
            name: "Decagon",
            logo: "/images/companies/decagon.png",
            alt: "Decagon logo",
        },
        {
            name: "Projaro",
            logo: "/images/companies/projaro.png",
            alt: "Projaro logo",
        },
        {
            name: "W Company",
            logo: "/images/companies/vw.png",
            alt: "W Company logo",
        },
    ]

    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        Our Partners
                    </div>

                    <h2 className="text-4xl md:text-5xl text-center font-bold text-[#020817] mb-4">
                        Companies That Use{" "}
                        <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1">
                            Frontlett
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Trusted by Leading Brands</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {partners.map((partner, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-8 flex items-center justify-center h-32">
                            <img
                                src={partner.logo || "/placeholder.svg"}
                                alt={partner.alt}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-blue-700 text-xl mb-8">Join these leading companies and build with Frontlett today!</p>
                    <div className="w-full flex justify-center">
                        <Button>
                            Get Started
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

export default PartnerCompanies

