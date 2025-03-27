import { FaPlay } from "react-icons/fa6";


const VideoSection = () => {
    return (
        <div className='w-full aspect-video relative'>
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-30% via-black/25 to-black/5"></div>
            <img src="/images/video-bg.webp" className='w-full h-full object-cover' alt="" />
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#D9D9D9D9] flex md:w-20 md:h-20 w-12 h-12 justify-center items-center">
                <FaPlay className="md:w-9 w-7 h-7 md:h-9" />
            </div> 
            <div className="absolute bottom-0 z-[3] block sm:hidden left-0 right-0 h-20 bg-gradient-to-b from-black/0 to-black/75"></div>
            <div className="absolute z-[5] md:max-w-[379px] w-full h-full md:left-16 left-0 bottom-0 top-0 flex md:items-center items-end">
                <p className="font-roboto text-white italic md:text-lg leading-[24px] text-center">“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been good”</p>
            </div>
        </div>
    )
}

export default VideoSection
