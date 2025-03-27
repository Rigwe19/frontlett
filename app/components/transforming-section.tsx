import type React from "react"

const TransformingSection: React.FC = () => {
  const features = [
    {
      icon: '/images/transforming/flexible.png',
      title: "Flexible Hiring",
      description: "Access top talent in 2-hour slots tailored to your needs",
    },
    {
      icon: '/images/transforming/cost-effective.png',
      title: "Cost-Effective Solutions",
      description: "Optimize your budget with our innovative staff-sharing model",
    },
    {
      icon: '/images/transforming/diverse.png',
      title: "Diverse Opportunities",
      description: "Empower professionals to work with multiple companies, enhancing their experience",
    },
    {
      icon: '/images/transforming/enhance.png',
      title: "Enhanced Productivity:",
      description: "Streamline operations with specialized resources when you need them",
    },
  ]

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-20 font-koho">
          Transforming the Way You Hire and Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {features.map((feature, index) => (
            <div key={feature.icon} className="px-6 py-8 md:py-0">
              <div className="flex justify-center md:mb-12">
                <img className="" src={feature.icon} />
              </div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#00031F] mb-4 text-center lg:text-left font-segoe">{feature.title}</h3>
              <p className="text-[#4D4F62] text-center lg:text-left">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TransformingSection

