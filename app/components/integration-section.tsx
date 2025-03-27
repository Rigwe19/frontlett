import type React from "react"

const IntegrationSection: React.FC = () => {
  const integrations = [
    {
      name: "Google Workspace",
      logo: './images/integration/google.png',
    },
    {
      name: "Slack",
      logo: './images/integration/slack.svg',
    },
    {
      name: "Gusto",
      logo: './images/integration/gusto.png',
    },
    {
      name: "Workday",
      logo: './images/integration/workday.png',
    },
    {
      name: "Office 365",
      logo: './images/integration/office.png',
    },
    {
      name: "Trello",
      logo: './images/integration/trello.png',
    },
    {
      name: "Altera",
      logo: './images/integration/altera.png',
    },
  ]

  return (
    <section className="w-full bg-[#00031f] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl text-white mb-8 leading-tight">
              Seamless
              <br />
              Integration with
              <br />
              Your Workflow
            </h2>

            <p className="text-white text-xl mb-8">Your favorite tools, all in one place</p>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2">
            <p className="text-white text-lg mb-8">
              Frontlett integrates effortlessly with your existing tools and processes, ensuring a smooth transition and
              minimal disruption
            </p>

            <a
              href="#"
              className="inline-flex items-center border border-blue-500 text-blue-400 px-6 py-3 rounded-lg font-medium transition-colors hover:bg-blue-900 hover:bg-opacity-30"
            >
              Read more
            </a>
          </div>
        </div>

        {/* Integration Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {integrations.map((integration, index) => (
            <div key={integration.name} className="bg-[#0a0d1f] rounded-lg p-4 flex items-center justify-center h-24">
              <img src={integration.logo} alt="integration" className="h-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntegrationSection

