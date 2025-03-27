import type React from "react"

const AboutSection: React.FC = () => {
  return (
    <section className="w-full bg-[#004494] py-20 font-roboto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h5 className="flex px-4 py-1.5 bg-primary w-fit rounded-full text-white text-sm font-medium mb-6">
            Our Story
          </h5>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Who
            <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-4"> We Are</span>
          </h2>

          <h3 className="text-xl md:text-2xl text-white font-light mb-6">Building the Future of Work with Frontlett</h3>

          <p className="text-[#BAE0FD] mb-6">
            At Frontlett, we are a team of passionate professionals dedicated to helping businesses achieve their goals
            through innovative solutions. Our mission is to provide flexible, scalable, and cost-effective team
            structures that empower companies to thrive in a competitive landscape.
          </p>

          <p className="text-[#BAE0FD] mb-10">
            With years of experience across industries, we bring expertise, creativity, and a collaborative spirit to
            every project. Whether you need a specialized team for a short-term project or long-term support, Frontlett
            is here to help you succeed.
          </p>

          <a
            href="#"
            className="inline-flex items-center bg-white text-blue-700 px-6 py-3 rounded-full font-medium transition-colors hover:bg-blue-50 w-fit"
          >
            Learn More About Us
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

        {/* Right Image */}
        <div className="lg:w-1/2 flex items-center justify-center relative">
          <div className="absolute w-8 h-8 bg-white rounded-xl bottom-0 -left-6 z-10"></div>
          <div className="w-full h-auto bg-white rounded-2xl overflow-hidden shadow-xl p-2">
            <img
              src="/images/who_we_are.webp"
              alt="Team members high-fiving in an office"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

