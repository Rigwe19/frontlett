import { useState, type FC } from "react";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

interface Testimonial {
    id: number
    name: string
    title: string
    quote: string
    image: string
    rating: number
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Jane Smith",
        title: "Operations Director, Global Production Systems",
        quote:
            "We've been able to scale our team up and down seamlessly, thanks to Frontlett. It's been a game-changer for our seasonal production needs.",
        image: "/images/clients.webp",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Johnson",
        title: "CTO, TechInnovate Solutions",
        quote:
            "Frontlett has revolutionized how we manage our distributed workforce. The platform's flexibility and intuitive interface have significantly improved our team's productivity.",
        image: "/images/clients.webp",
        rating: 5,
    },
    {
        id: 3,
        name: "Sarah Williams",
        title: "HR Director, Global Retail Inc.",
        quote:
            "The ability to quickly onboard specialized talent for short-term projects has given us a competitive edge. Frontlett's platform is simply unmatched in the industry.",
        image: "/images/clients.webp",
        rating: 5,
    },
    {
        id: 4,
        name: "David Chen",
        title: "VP of Engineering, CloudSoft",
        quote:
            "As a fast-growing startup, we needed a solution that could grow with us. Frontlett provided exactly that, helping us scale our engineering team efficiently without compromising quality.",
        image: "/images/clients.webp",
        rating: 5,
    },
]

const TestimonialSlider: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [swiper, setSwiper] = useState<any>(null);

    const handlePrev = () => {
        swiper?.slidePrev()
    }

    const handleNext = () => {
        swiper?.slideNext()
    }

    const handleDotClick = (index: number) => {
        swiper?.slideTo(index)
    }

    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        Client Success Stories
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4">
                        What<span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1"> Our Customers</span>{' '}
                        Are Saying About Frontlett
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Hear from customers who trust Frontlett for their workforce management needs.
                    </p>
                </div>

                <Swiper loop autoplay modules={[Autoplay]} onSwiper={swiper => setSwiper(swiper)} onSlideChange={e => setCurrentIndex(e.realIndex)} className="relative max-w-4xl mx-auto">
                    {testimonials.map(testimonial => <SwiperSlide key={testimonial.name}>
                        <div className="flex flex-col md:flex-row items-center gap-12 p-6">
                            <div className="md:w-1/3 flex-shrink-0">
                                <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-blue-50 mx-auto">
                                    <img
                                        src={testimonial.image || "/placeholder.svg"}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-6 h-6 text-blue-500 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-blue-700 italic text-xl mb-6">"{testimonial.quote}"</p>

                                <h3 className="font-bold text-xl text-gray-900">{testimonial.name}</h3>
                                <p className="text-gray-600">{testimonial.title}</p>
                            </div>
                        </div>

                    </SwiperSlide>)}

                    <div className="flex justify-center items-center mt-12 space-x-2">
                        <button
                            onClick={handlePrev}
                            className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? "w-8 bg-blue-500" : "bg-blue-200 hover:bg-blue-300"
                                        } transition-all`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-colors"
                            aria-label="Next testimonial"
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
                </Swiper>
            </div>
        </section>
    )
}

export default TestimonialSlider