interface ComparisonFeature {
    name: string
    frontlett: boolean
    fulltime: boolean
    freelance: boolean
}

const ComparisonSection: React.FC = () => {
    const features: ComparisonFeature[] = [
        {
            name: "Scalable Team Size",
            frontlett: true,
            fulltime: false,
            freelance: true,
        },
        {
            name: "Specialized Expertise",
            frontlett: true,
            fulltime: false,
            freelance: true,
        },
        {
            name: "Cost-Effective",
            frontlett: true,
            fulltime: false,
            freelance: true,
        },
        {
            name: "Quick Ramp-Up",
            frontlett: true,
            fulltime: false,
            freelance: true,
        },
        {
            name: "Dedicated Support",
            frontlett: true,
            fulltime: true,
            freelance: false,
        },
        {
            name: "Team Cohesion",
            frontlett: true,
            fulltime: true,
            freelance: false,
        },
        {
            name: "Quality Control",
            frontlett: true,
            fulltime: true,
            freelance: false,
        },
        {
            name: "Long-term Stability",
            frontlett: true,
            fulltime: true,
            freelance: false,
        },
    ]

    const CheckIcon = () => (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
    )

    const XIcon = () => (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    )

    return (
        <section className="w-full bg-blue-50 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        Make the Right Choice
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4">
                        Frontlett vs. Full{/**/}
                        <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1">
                            time vs. Free
                        </span>{/**/}
                        lance
                    </h2>

                    <p className="text-xl text-blue-700 max-w-3xl mx-auto">Find the Best Fit for Your Project</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Frontlett Card */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-2 border-blue-500 flex flex-col h-full">
                        <div className="bg-blue-600 text-white py-3 text-center">
                            <p className="font-medium">Recommended</p>
                        </div>

                        <div className="p-6 flex-grow">
                            <h3 className="text-2xl font-bold text-center text-blue-800 mb-1">Frontlett Virtual Team</h3>
                            <h4 className="text-3xl font-bold text-center text-blue-600 mb-4">Flexible</h4>
                            <p className="text-center text-blue-500 mb-6">Pay only for what you need</p>

                            <p className="text-gray-700 mb-8">
                                A dedicated team of experts matched to your project needs with the flexibility to scale up or down as
                                required.
                            </p>

                            <div className="space-y-3">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        {feature.frontlett ? <CheckIcon /> : <XIcon />}
                                        <span className="ml-2 text-gray-700">{feature.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 pt-0">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Full-Time Card */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 flex flex-col h-full">
                        <div className="p-6 flex-grow">
                            <h3 className="text-2xl font-bold text-center text-gray-800 mb-1">Full-Time Team</h3>
                            <h4 className="text-3xl font-bold text-center text-gray-700 mb-4">Fixed</h4>
                            <p className="text-center text-blue-500 mb-6">Annual salary & benefits</p>

                            <p className="text-gray-700 mb-8">
                                An in-house team that is fully integrated into your company culture and exclusively dedicated to your
                                projects.
                            </p>

                            <div className="space-y-3">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        {feature.fulltime ? <CheckIcon /> : <XIcon />}
                                        <span className="ml-2 text-gray-700">{feature.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Freelance Card */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 flex flex-col h-full">
                        <div className="p-6 flex-grow">
                            <h3 className="text-2xl font-bold text-center text-gray-800 mb-1">Freelance</h3>
                            <h4 className="text-3xl font-bold text-center text-gray-700 mb-4">Variable</h4>
                            <p className="text-center text-blue-500 mb-6">Hourly or project-based</p>

                            <p className="text-gray-700 mb-8">
                                Individual contractors hired for specific tasks or projects on a temporary basis with minimal
                                commitment.
                            </p>

                            <div className="space-y-3">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        {feature.freelance ? <CheckIcon /> : <XIcon />}
                                        <span className="ml-2 text-gray-700">{feature.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ComparisonSection

