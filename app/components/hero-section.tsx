import Button from "./ui/button"
import { FaPlay } from 'react-icons/fa6'

const HeroSection: React.FC = () => {
    return (
        <div className="relative z-[1] w-full max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
            <div className="absolute inset-0 z-0 grid-cols-2 max-md:grid hidden overflow-hidden">
                <div className="absolute inset-0 bg-[#001B2FDE]"></div>
                <div className="w-full">
                    <div className="w-full h-[281px] self-stretch" style={{ background: 'url(./images/hero/sm-hero-1.jpg) lightgray 50%/cover no-repeat' }} />
                    <div className="w-full h-[281px] self-stretch" style={{ background: 'url(./images/hero/sm-hero-2.jpg) lightgray 50%/cover no-repeat' }} />
                    <div className="w-full h-[281px] self-stretch" style={{ background: 'url(./images/hero/sm-hero-3.jpg) lightgray 50%/cover no-repeat' }} />
                    <div className="w-full h-[281px] self-stretch" style={{ background: 'url(./images/hero/sm-hero-4.jpg) lightgray 50%/cover no-repeat' }} />
                </div>
                <div className="w-full">
                    <div className="w-full h-[281px] self-stretch -mt-20" style={{ background: 'url(./images/hero/sm-hero-11.jpg) lightgray 50%/cover no-repeat' }} />
                    <div className="w-full h-[281px] self-stretch" style={{ background: 'url(./images/hero/sm-hero-12.jpg) lightgray 50%/cover no-repeat' }} />
                    <div className="w-full h-[281px] self-stretch" style={{ background: 'url(./images/hero/sm-hero-13.jpg) lightgray 50%/cover no-repeat' }} />
                    <div className="w-full h-[281px] self-stretch" style={{ background: 'url(./images/hero/sm-hero-14.jpg) lightgray 50%/cover no-repeat' }} />
                </div>
            </div>
            {/* Top Left Image */}
            <div className="absolute top-0 left-4 aspect-square h-1/3 p-2 bg-[#D3D3D3] shadow-lg rounded-[32px] z-10 transform -rotate-3 hidden md:block">
                <img
                    src="/images/hero-top.webp"
                    alt="People collaborating on a laptop"
                    className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
            </div>

            {/* Top Right Image */}
            <div className="absolute top-0 right-4 aspect-square h-1/3 p-2 bg-[#D3D3D3] shadow-lg rounded-[32px] z-10 transform rotate-3 hidden md:block">
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
                        <img src="/images/trusted/hero1.jpg" alt="" className="md:w-8 md:h-8 w-5 h-5 rounded-full bg-gray-300 " />
                        <img src="/images/trusted/hero2.jpg" alt="" className="md:w-8 md:h-8 w-5 h-5 rounded-full bg-gray-300 -ml-2.5" />
                        <img src="/images/trusted/hero3.jpg" alt="" className="md:w-8 md:h-8 w-5 h-5 rounded-full bg-gray-300 -ml-2.5" />
                        <img src="/images/trusted/hero4.jpg" alt="" className="md:w-8 md:h-8 w-5 h-5 rounded-full bg-gray-300 -ml-2.5" />
                        <img src="/images/trusted/hero5.jpg" alt="" className="md:w-8 md:h-8 w-5 h-5 rounded-full bg-gray-300 -ml-2.5" />
                        {/* {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-full border-2 border-white bg-gray-300 ${i > 1 ? "-ml-2.5" : ""}`}
                                style={{ backgroundColor: `hsl(${i * 60}, 70%, 60%)` }}
                            />
                        ))} */}
                    </div>
                    <span className="md:text-base text-[7px] font-medium text-gray-800 font-amiko">Trusted by 50k+ Companies</span>
                </div>

                {/* Hero Content */}
                <div className="text-center max-w-3xl z-20">
                    <h1 className="text-[22px] md:text-5xl text-white md:text-gray-800 font-extrabold mb-4 leading-tight font-koho">
                        Transform the Way You Work:
                        <br />
                        Flexible Hiring, Maximum Impact.
                    </h1>
                    <p className="md:text-lg text-sm text-white md:text-black mb-10 font-proxima">Empowering companies and resources through timeslot hiring</p>

                    <Button className="mx-auto">
                        Watch Video
                        <FaPlay />
                    </Button>
                </div>
            </div>


            {/* Bottom Left Image */}
            <div className="absolute bottom-8 left-4 aspect-square h-1/3 p-2 bg-[#D3D3D3] shadow-lg rounded-[32px] z-10 transform rotate-3 hidden md:block">
                <img
                    src="/images/hero-left.webp"
                    alt="Team members reviewing documents"
                    className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
            </div>

            {/* Bottom Right Image */}
            <div className="absolute bottom-8 right-4 aspect-square h-1/3 p-2 bg-[#D3D3D3] shadow-lg rounded-[32px] z-10 transform -rotate-3 hidden md:block">
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

