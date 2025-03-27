import { GiCheckMark } from "react-icons/gi"

const ConnectSection: React.FC = () => {
    const features = [
        "Direct and group chats to facilitate smooth collaboration between companies and shared staff.",
        "Employers can send important updates about projects, schedules, and expectations to their flexible workforce",
        "Real-time feedback and reporting tools to help companies manage their allocated workforce efficiently",
    ]

    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Image */}
                    <div className="lg:w-1/2">
                        <div className="w-full h-auto rounded-lg overflow-hidden">
                            <img
                                src="/images/person_using_phone.webp"
                                alt="Person using phone and laptop"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl text-[#0d134c] mb-10 leading-tight -full md:max-w-[333px]">
                            Instantly
                            Connect with
                            Your Flexible
                            Workforce
                        </h2>

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <GiCheckMark size={20} color="#0D134C" />
                                    <p className="text-[#0d134c] text-[17px] leading-[22.95px] font-semibold w-full md:max-w-[370px]">{feature}</p>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#"
                            className="inline-flex items-center text-blue-500 font-medium mt-10 hover:text-blue-700 transition-colors"
                        >
                            Explore Directory
                            <svg
                                className="ml-2 w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ConnectSection