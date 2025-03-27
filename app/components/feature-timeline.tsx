import { LuMessageCircleMore, LuChartNoAxesColumn, LuMail, LuChartPie  } from "react-icons/lu";
import { RiBarChartLine } from "react-icons/ri";

const FeaturesTimeline: React.FC = () => {
    const timelineItems = [
        {
            category: "Communication",
            title: "Seamless Workforce Coordination",
            description: "Enable businesses to streamline workforce communication and resource sharing effectively.",
            features: [
                ["Staff Assignment Dashboard", "Live Chat Support"],
                ["Virtual Meetings", "Newsletter"],
                ["Digital Announcements"],
            ],
        },
        {
            category: "Engagement",
            title: "Empower Your Workforce with Flexibility",
            description:
                "Bridge the gap between companies and skilled professionals by fostering a shared workforce ecosystem",
            features: [
                ["Community Spaces", "Task Allocation"],
                ["Incentive Programs"],
                ["Recognition & Rewards", "Work Flexibility"],
            ],
        },
        {
            category: "Digital workplace",
            title: "A Smarter Way to Manage Talent & Resources",
            description:
                "Our platform provides businesses with an innovative way to access talent without full-time hiring constraints.",
            features: [
                ["Talent Pool Access", "Digital HR Tools"],
                ["Workforce Management System"],
                ["Seamless Integrations", "AI-driven Hiring Assistance"],
            ],
        },
        {
            category: "Analytics & insights",
            title: "Data-Driven Workforce Optimization",
            description: "Track employee engagement, work trends, and resource utilization to make informed decisions.",
            features: [["Performance Metrics", "Surveys & Feedback"], ["Workload Insights"], ["Hiring Efficiency Reports"]],
        },
    ]

    return (
        <section className="w-full bg-white pb-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top Semi-Circle Diagram */}
                <div className="bg-purple-50 rounded-3xl p-8 mb-8 relative">
                    <div className="flex justify-center items-center">
                        <div className="relative w-full max-w-2xl">
                            {/* Center Logo */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                                <div className="md:text-xl mb-1">Frontlett</div>
                                <div className="md:text-xl mb-3">Investors</div>
                                <img src="./logo.png" alt="" className="md:w-[117px] w-2/5 mx-auto" />
                            </div>

                            {/* Semi-Circle with Categories */}
                            <div className="w-full aspect-[2/1] relative">
                                {/* Circles */}
                                <div className="absolute inset-0 rounded-t-full border-gray-200 border"></div>
                                <div className="absolute inset-0 scale-75 origin-bottom rounded-t-full border-gray-200 border"></div>

                                {/* Category: Engagement */}
                                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="w-[47px] h-[47px] bg-white rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-2">
                                        <div className="w-5 h-5 rounded border flex justify-center items-center">
                                            <LuChartNoAxesColumn size={14} color="#0A0D1F" />
                                        </div>

                                    </div>
                                    <div className="text-sm font-medium">Engagement</div>
                                </div>

                                {/* Category: Digital workplace */}
                                <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="w-[47px] h-[47px] bg-white rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-2">
                                        <LuMail size={20} color="#0A0D1F" />
                                    </div>
                                    <div className="text-sm font-medium">Digital workplace</div>
                                </div>

                                {/* Category: Communication */}
                                <div className="absolute top-2/3 left-1/4 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="w-[47px] h-[47px] bg-[#FFF0D2] rounded-full border border-[#A69BB7] flex items-center justify-center mx-auto mb-2">

                                        <LuMessageCircleMore size={20} color="#0A0D1F" />
                                    </div>
                                    <div className="text-sm font-medium">Communication</div>
                                </div>

                                {/* Category: Analytics & insights */}
                                <div className="absolute top-2/3 right-1/4 translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="w-[47px] h-[47px] bg-white rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-2">
                                        <LuChartPie size={20} color="#0A0D1F" />
                                    </div>
                                    <div className="text-sm font-medium">Analytics & insights</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute md:left-1/2 left-0 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

                    {/* Timeline Items */}
                    {timelineItems.map((item, index) => (
                        <div key={index} className="relative mb-24">
                            {/* Timeline Dot */}
                            <div className="absolute md:left-1/2 left-0 top-3 transform -translate-x-1/2 -mt-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white z-10"></div>

                            <div className="flex flex-col md:flex-row pl-4 md:pl-0">
                                {/* Left Side (always empty for odd indices) */}
                                <div className="md:w-1/2 md:pr-12 md:text-right">
                                    {index % 2 === 0 && (
                                        <div className="mb-8">
                                            <div className="mb-4 text-sm font-medium text-gray-500">{item.category}</div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                            <p className="text-gray-600 mb-6">{item.description}</p>

                                            <div className="space-y-3 mb-4">
                                                {item.features.map((featureGroup, groupIndex) => (
                                                    <div key={groupIndex} className="flex flex-wrap justify-end gap-x-8">
                                                        {featureGroup.map((feature, featureIndex) => (
                                                            <div key={featureIndex} className="flex items-center">
                                                                <div className="w-1 h-1 rounded-full bg-gray-400 mr-2"></div>
                                                                <span className="text-sm text-gray-600">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>

                                            <a
                                                href="#"
                                                className="inline-flex items-center text-purple-600 text-sm font-medium hover:text-purple-800"
                                            >
                                                Learn more
                                                <svg
                                                    className="ml-1 w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side (always empty for even indices) */}
                                <div className="md:w-1/2 md:pl-12">
                                    {index % 2 === 1 && (
                                        <div className="mb-8">
                                            <div className="mb-4 text-sm font-medium text-gray-500">{item.category}</div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                            <p className="text-gray-600 mb-6">{item.description}</p>

                                            <div className="space-y-3 mb-4">
                                                {item.features.map((featureGroup, groupIndex) => (
                                                    <div key={groupIndex} className="flex flex-wrap gap-x-8">
                                                        {featureGroup.map((feature, featureIndex) => (
                                                            <div key={featureIndex} className="flex items-center">
                                                                <div className="w-1 h-1 rounded-full bg-gray-400 mr-2"></div>
                                                                <span className="text-sm text-gray-600">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>

                                            <a
                                                href="#"
                                                className="inline-flex items-center text-purple-600 text-sm font-medium hover:text-purple-800"
                                            >
                                                Learn more
                                                <svg
                                                    className="ml-1 w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturesTimeline

