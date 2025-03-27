import { FaUserCircle } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa6";


const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white pt-12 pb-8">
            {/* Money Back Guarantee Banner */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                        <div className="w-24 h-24 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                            <img src="/images/money-back.png" alt="" className="" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-[#3E3F94] mb-2">30 Days money back guarantee</h3>
                            <p className="text-gray-700">
                                We're so confident in our service, we offer a 30-day money-back guarantee.
                            </p>
                        </div>
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:bg-blue-600"
                    >
                        Learn More
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

            <div className="mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
                    {/* Logo and CTA Buttons */}
                    <div className="md:col-span-1">
                        <div className="mb-6">
                            <img src="/logo.png" alt="" className="w-3/4" />
                        </div>

                        <div className="space-y-4">
                            <a
                                href="#"
                                className="flex items-center justify-center w-full border border-gray-300 rounded-full py-3 px-6 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Start for Free
                                <svg
                                    className="ml-2 w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>

                            <a
                                href="#"
                                className="flex gap-2 items-center justify-center w-full border border-gray-300 rounded-full py-3 px-6 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <FaUserCircle />
                                Login
                            </a>
                        </div>
                    </div>

                    {/* Features Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
                        <ul className="space-y-3">
                            {[
                                "Staff Sharing",
                                "Job Sharing",
                                "HR Account Officer",
                                "Reward System",
                                "Hire Fulltime",
                                "Move to Virtualting",
                                "Vitualancer",
                                "Moonlighting",
                            ].map((item, index) => (
                                <li key={index}>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Company</h3>
                        <ul className="space-y-3">
                            {[
                                "Customers",
                                "About Us",
                                "Contact Us",
                                "Careers",
                                "Affiliates",
                                "Partnership",
                                "Referral program",
                                "Pricing",
                            ].map((item, index) => (
                                <li key={index}>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solutions Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Solutions</h3>
                        <ul className="space-y-3">
                            {[
                                "Startup",
                                "Retail",
                                "Real Estate",
                                "Hospitality",
                                "Beauty/Cosmetics",
                                "Manufacturing",
                                "Blue Collar",
                                "Corporation & Gov",
                            ].map((item, index) => (
                                <li key={index}>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources and Contact Column */}
                    {/* <div> */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {[
                                "Document Knowledge Base",
                                "Brand Materials",
                                "Marketplace",
                                "Document FAQ",
                                "Learning",
                                "Brand Materials",
                            ].map((item, index) => (
                                <li key={index}>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Request a Call Back</h3>
                        <p className="text-gray-600 mb-2">(+234) 845-422-8462</p>
                        <p className="text-gray-600">
                            Monday-Friday,
                            <br />
                            9am-5pm
                            <br />
                            EST
                        </p>
                    </div>
                    {/* </div> */}
                </div>

                {/* Copyright and Bottom Links */}
                <div className="pt-8 border-t border-gray-200">
                    <p className="text-center text-gray-600 mb-8">© 2025 Frontlett Virtualting. All Rights Reserved</p>

                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6 md:mb-0">
                            {["Cookies Settings", "Privacy", "Terms", "Trust Center", "Cookies Policy"].map((item, index) => (
                                <a key={index} href="#" className="text-gray-600 underline hover:text-blue-600 transition-colors">
                                    {item}
                                </a>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            {[
                                { name: "Facebook", icon: <FaFacebookF size={20} color="white" /> },
                                {
                                    name: "YouTube",
                                    icon: <FaYoutube size={20} color="white" />,
                                },
                                {
                                    name: "LinkedIn",
                                    icon: <FaLinkedinIn size={20} color="white" />,
                                },
                                {
                                    name: "Instagram",
                                    icon: <FaInstagram size={20} color="white" />,
                                },
                                {
                                    name: "TikTok",
                                    icon: <FaTiktok size={20} color="white" />,
                                },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[#4D4D4D] hover:bg-gray-700 transition-colors"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

