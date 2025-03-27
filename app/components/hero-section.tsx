import Button from "./ui/button"
import { FaPlay } from 'react-icons/fa6'

const HeroSection: React.FC = () => {
    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
            {/* Top Left Image */}
            <div className="absolute top-0 left-0 w-[280px] h-[280px] p-2 bg-[#D3D3D3] shadow-lg rounded-[32px] z-10 transform -rotate-3 hidden md:block">
                <img
                    src="/images/hero-top.webp"
                    alt="People collaborating on a laptop"
                    className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
            </div>

            {/* Top Right Image */}
            <div className="absolute top-0 right-0 w-[280px] h-[280px] p-2 bg-[#D3D3D3] shadow-lg rounded-[32px] z-10 transform rotate-3 hidden md:block">
                <img
                    src="/images/hero-right.webp"
                    alt="People working together at a desk"
                    className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
            </div>
            <div className="flex flex-col gap-8 justify-center items-center">
                {/* Trust Badge */}
                <div className="flex items-center bg-blue-50 px-5 py-2 rounded-full mb-10 z-20 shadow-xl">
                    <div className="flex mr-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-full border-2 border-white bg-gray-300 ${i > 1 ? "-ml-2.5" : ""}`}
                                style={{ backgroundColor: `hsl(${i * 60}, 70%, 60%)` }}
                            />
                        ))}
                    </div>
                    <span className="text-base font-medium text-gray-800 font-amiko">Trusted by 50k+ Companies</span>
                </div>

                {/* Hero Content */}
                <div className="text-center max-w-3xl z-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight font-koho">
                        Transform the Way You Work:
                        <br />
                        Flexible Hiring, Maximum Impact.
                    </h1>
                    <p className="text-lg text-black mb-10 font-proxima">Empowering companies and resources through timeslot hiring</p>

                    <Button>
                        Watch Video
                        <FaPlay />
                    </Button>
                </div>
            </div>


            {/* Bottom Left Image */}
            <div className="absolute bottom-8 left-0 w-[280px] h-[280px] p-2 bg-[#D3D3D3] shadow-lg rounded-[32px] z-10 transform rotate-3 hidden md:block">
                <img
                    src="/images/hero-left.webp"
                    alt="Team members reviewing documents"
                    className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
            </div>

            {/* Bottom Right Image */}
            <div className="absolute bottom-8 right-0 w-[280px] h-[280px] p-2 bg-[#D3D3D3] shadow-lg rounded-[32px] z-10 transform -rotate-3 hidden md:block">
                <img
                    src="/images/hero-bottom.webp"
                    alt="People looking at tablet"
                    className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
            </div>
        </div>
    )
}

export default HeroSection

