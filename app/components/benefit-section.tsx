import { FiUsers, FiDollarSign, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import Button from "./ui/button";

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <FiUsers size={32} color="#0058AB" />,
      title: "Expertise on Demand",
      description:
        "Access a team of highly skilled professionals ready to tackle your project with precision and efficiency.",
    },
    {
      icon: <FiDollarSign size={32} color="#0058AB" />,
      title: "Cost-Effective Solutions",
      description: "Save on long-term costs with flexible team structures tailored to your budget.",
    },
    {
      icon: <FiTrendingUp size={32} color="#0058AB" />,
      title: "Faster Time-to-Market",
      description: "Get your project off the ground quickly with our ready-to-deploy team.",
    },
    {
      icon: <FiCheckCircle size={32} color="#0058AB" />,
      title: "Scalability",
      description: "Easily scale your team up or down based on your project's needs.",
    },
  ]

  return (
    <section className="w-full bg-white py-20 font-roboto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-[#E0EFFE] text-[#064A8D] rounded-full text-sm font-medium mb-6">
            The Frontlett Advantage
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#020817] mb-4">
            Why Choose            
            <span className="after:bg-[#BAE0FD] relative after:absolute after:bottom-1 after:opacity-70 after:rotate-1 after:w-full after:h-3 after:left-1"> Frontlett</span>
          </h2>

          <h3 className="text-xl md:text-2xl text-[#4B5563]">The Benefits of Working with Frontlett</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#E0EFFE] rounded-full flex items-center justify-center mb-6">
                {benefit.icon} 
              </div>
              <h4 className="text-xl font-bold text-[#0A3D73] mb-4">{benefit.title}</h4>
              <p className="text-[#0072D6]">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button>
            Get Started
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection

