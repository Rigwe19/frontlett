import { useState, type FC } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"

interface Employee {
    id: number
    name: string
    title: string
    department: string
    joinedTime: string
    experience: string
    rating: number
    quote: string
    image: string
}

const employees: Employee[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        title: "Factory Operator",
        department: "Manufacturing",
        joinedTime: "Joined 2 years ago",
        experience: "3 years exp",
        rating: 5,
        quote:
            "Frontlett made it easy to find shifts that match my schedule. The platform's flexibility allows me to work around my family commitments.",
        image: "/images/stories/sarah.jpg",
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        title: "Warehouse Associate",
        department: "Logistics",
        joinedTime: "Joined 8 months ago",
        experience: "2 years exp",
        rating: 4,
        quote:
            "The onboarding process was smooth, and I was able to start working within days. The app makes it easy to track my hours and earnings.",
        image: "/images/stories/michael.jpg",
    },
    {
        id: 3,
        name: "Lisa Chen",
        title: "Quality Inspector",
        department: "Quality Assurance",
        joinedTime: "Joined 3 years ago",
        experience: "5 years exp",
        rating: 5,
        quote:
            "As someone with specialized skills, Frontlett helps me connect with companies that value my expertise. The verification process ensures my certifications are recognized.",
        image: "/images/stories/lisa.jpg",
    },
    {
        id: 4,
        name: "James Wilson",
        title: "IT Support Specialist",
        department: "Technology",
        joinedTime: "Joined 1 year ago",
        experience: "4 years exp",
        rating: 5,
        quote:
            "Frontlett has transformed how I approach my career. I can now work with multiple companies simultaneously, expanding my skill set and increasing my income.",
        image: "/images/stories/michael.jpg",
    },
    {
        id: 5,
        name: "Maria Garcia",
        title: "Customer Service Rep",
        department: "Customer Support",
        joinedTime: "Joined 1.5 years ago",
        experience: "6 years exp",
        rating: 4,
        quote:
            "The flexibility to choose my own hours has improved my work-life balance tremendously. I can now pursue my education while maintaining a steady income.",
        image: "/images/stories/lisa.jpg",
    },
]

const EmployeeStories: FC = () => {
    const [startIndex, setStartIndex] = useState(0)
    const [swiper, setSwiper] = useState<any>(null);
    const visibleCount = 3
    const maxStartIndex = employees.length - visibleCount

    const handlePrev = () => {
        swiper.slidePrev()
    }

    const handleNext = () => {
        swiper.slideNext()
    }

    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <svg
                    key={i}
                    className={`w-5 h-5 ${i < rating ? "text-blue-500" : "text-gray-300"} fill-current`}
                    viewBox="0 0 24 24"
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))
    }

    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        Employee Stories
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4">
                        Hear From Our{" "}
                        <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1">Workforce</span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Real stories from workers who found opportunities through Frontlett
                    </p>
                </div>
                <Swiper onSwiper={swiper => setSwiper(swiper)} breakpoints={{ 
                    0: {slidesPerView: 1},
                    768: {slidesPerView: 3}
                 }} onSlideChange={e=>setStartIndex(e.realIndex)} className="h-80" spaceBetween={10} slidesPerGroup={1}>
                    {employees.map((employee) => (
                        <SwiperSlide key={employee.id}>
                            <div className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md h-full">
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                        <img
                                            src={employee.image || "/placeholder.svg"}
                                            alt={employee.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-blue-700">{employee.name}</h3>
                                        <p className="text-gray-700">{employee.title}</p>
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mr-4">{employee.department}</span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>{employee.joinedTime}</span>
                                </div>

                                <div className="flex items-center mb-4">
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 inline mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {employee.experience}
                                    </span>

                                    <div className="flex">{renderStars(employee.rating)}</div>
                                </div>

                                <p className="text-gray-600 italic">"{employee.quote}"</p>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>

                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${startIndex === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            } transition-colors`}
                        aria-label="Previous stories"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={startIndex >= maxStartIndex}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${startIndex >= maxStartIndex
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            } transition-colors`}
                        aria-label="Next stories"
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
            </div>
        </section>
    )
}

export default EmployeeStories

