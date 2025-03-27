import type React from "react"

const ClientShowcase: React.FC = () => {
  // Company logos as simple SVG components
  const logos = [
    // Virgin
    '/images/clients/virgin.png',

    // A+E Networks
    '/images/clients/a-e.png',

    // TELUS
    '/images/clients/telus.png',

    // Ryanair
    '/images/clients/ryanair.png',

    // Dollar General
    '/images/clients/dollar.png',

    // Amazon
    '/images/clients/amazon.png',

    // Bupa
    // <svg key="bupa" viewBox="0 0 100 30" className="w-full h-full fill-white">
    //   <path d="M20,10c-2.8,0-5,2.2-5,5v5c0,2.8,2.2,5,5,5h5c2.8,0,5-2.2,5-5v-5c0-2.8-2.2-5-5-5H20z M20,13h5c1.1,0,2,0.9,2,2v5 c0,1.1-0.9,2-2,2h-5c-1.1,0-2-0.9-2-2v-5C18,13.9,18.9,13,20,13z M40,10c-2.8,0-5,2.2-5,5v5c0,2.8,2.2,5,5,5h5v-3h-5 c-1.1,0-2-0.9-2-2v-5c0-1.1,0.9-2,2-2h5v-3H40z M55,10c-2.8,0-5,2.2-5,5v5c0,2.8,2.2,5,5,5h5v-3h-5c-1.1,0-2-0.9-2-2v-5 c0-1.1,0.9-2,2-2h5v-3H55z M70,10v15h3v-6h2c2.8,0,5-2.2,5-5s-2.2-5-5-5H70z M73,13h2c1.1,0,2,0.9,2,2s-0.9,2-2,2h-2V13z" />
    // </svg>,
  ]

  return (
    <section className="w-full bg-[#00031f] py-16">
      <div className="mx-auto px-4">
        <h2 className="text-white text-center text-xl md:text-2xl mb-16 leading-[28px] font-segoe font-light">
          THE WORLD'S NO.1 EMPLOYEE EXPERIENCE PLATFORM FOR MILLIONS OF USERS 
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-12 md:gap-x-12 lg:gap-x-16">
          {logos.map((logo, index) => (
            <img key={index} src={logo} className="flex items-center justify-center"/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientShowcase

