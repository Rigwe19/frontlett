import { IoSendSharp } from "react-icons/io5";
import Button from "./ui/button";



const NewsletterSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20">
        <img src="/images/subscribe-bar.svg" alt="subscribe bar" className="w-full mb-4" />
      <div className="max-w-5xl mx-auto px-4">
        {/* Decorative bars */}
        {/* <div className="flex justify-center items-end h-32 mb-12">
          <div className="w-8 h-24 bg-blue-500 mx-1"></div>
          <div className="w-8 h-16 bg-blue-500 mx-1"></div>
          <div className="w-8 h-32 bg-blue-500 mx-1"></div>
          <div className="w-8 h-12 bg-blue-500 mx-1"></div>
          <div className="w-8 h-20 bg-blue-500 mx-1"></div>
          <div className="w-8 h-28 bg-blue-500 mx-1"></div>
          <div className="w-8 h-16 bg-blue-500 mx-1 hidden md:block"></div>
          <div className="w-8 h-24 bg-blue-500 mx-1 hidden md:block"></div>
          <div className="w-8 h-12 bg-blue-500 mx-1 hidden md:block"></div>
        </div> */}

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Subscribe !</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Subscribe to our newsletter to get latest news and updates
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="flex flex-row gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-grow px-6 py-4 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <Button>
                <IoSendSharp />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection

