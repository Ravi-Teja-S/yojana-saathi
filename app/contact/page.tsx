import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const page = () => {
  const teamMembers = [
    {
      name: "Ravi Teja S",
      role: "AI/ML Engineer",
      description: "Focused on chatbot and voice agent implementation",
      image: "/Ravi.png",
      email: "ravithejatheja03@gmail.com",
      linkedin: "https://linkedin.com/in/ravi-teja-satrasala/"
    },
    {
      name: "Pratham Patil",
      role: "Backend Developer",
      description: "Expert in server-side logic and database management",
      image: "/Pratham.png",
      email: "prathampatil.is23@bmsce.ac.in",
      linkedin: "https://www.linkedin.com/in/prathammp/"
    },
    {
      name: "Praveen Kumar Y",
      role: "Full Stack Developer",
      description: "Specialized in frontend development and UI/UX design",
      image: "/Praveen.png",
      email: "praveenkumary.is23@bmsce.ac.in",
      linkedin: "https://www.linkedin.com/in/praveen-kumar-y-97i/"
    },
    {
      name: "Rishikesh Bulagouda",
      role: "DevOps Engineer",
      description: "Handles deployment, infrastructure and system integration",
      image: "/Rishikesh.png",
      email: "rishikeshrudragouda.is23@bmsce.ac.in",
      linkedin: "https://www.linkedin.com/in/rishikesh-rudragouda-bulagouda-0ab8b0381/"
    }
  ]

  return (
    <div className='w-full'>
      {/* Hero Section */}
      <section className='bg-linear-to-r from-[#2660A4] to-[#1e4a7a] text-white py-20 px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl font-bold mb-6'>Meet Our Team</h1>
          <p className='text-xl text-gray-100'>
            The developers behind Yojana Saathi - Empowering citizens through technology
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16 px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4 text-center'>Our Development Team</h2>
          <p className='text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto'>
            A dedicated group of Information science students from BMS College of Engineering,
            working together to make government schemes accessible to every citizen.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {teamMembers.map((member, index) => (
              <div key={index} className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#F19953]/20'>
                <div className='text-center'>
                  <div className='w-32 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#2660A4]/10'>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={160}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>{member.name}</h3>
                  <p className='text-[#2660A4] font-semibold mb-3'>{member.role}</p>
                  <p className='text-gray-600 text-sm leading-relaxed mb-4'>{member.description}</p>

                  {/* Contact Links */}
                  <div className='flex justify-center space-x-4'>
                    <a
                      href={`mailto:${member.email}`}
                      className='flex items-center justify-center w-10 h-10 bg-[#2660A4]/10 hover:bg-[#2660A4] text-[#2660A4] hover:text-white rounded-full transition-all duration-300'
                      title={`Email ${member.name}`}
                    >
                      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/>
                      </svg>
                    </a>
                    <a
                      href={member.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center justify-center w-10 h-10 bg-[#0077B5]/10 hover:bg-[#0077B5] text-[#0077B5] hover:text-white rounded-full transition-all duration-300'
                      title={`LinkedIn ${member.name}`}
                    >
                      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Info Section */}
      <section className='py-16 px-8 bg-gray-50'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl font-bold text-gray-900 mb-8'>About the Project</h2>
          <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>Yojana Saathi</h3>
            <p className='text-gray-700 leading-relaxed mb-6'>
              A comprehensive AI-powered platform designed to help Karnataka citizens easily discover,
              understand, and apply for government schemes. Built as a portfolio project by BMSCE students
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-left'>
              <div className='text-center'>
                <div className='text-3xl mb-2'>🎯</div>
                <h4 className='font-semibold text-gray-900 mb-2'>Mission</h4>
                <p className='text-sm text-gray-600'>Bridge the gap between citizens and government welfare programs</p>
              </div>
              <div className='text-center'>
                <div className='text-3xl mb-2'>💡</div>
                <h4 className='font-semibold text-gray-900 mb-2'>Innovation</h4>
                <p className='text-sm text-gray-600'>AI-powered chatbot and voice assistance for personalized guidance</p>
              </div>
              <div className='text-center'>
                <div className='text-3xl mb-2'>🌟</div>
                <h4 className='font-semibold text-gray-900 mb-2'>Impact</h4>
                <p className='text-sm text-gray-600'>Making government schemes accessible to every citizen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='py-16 px-8 bg-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl font-bold text-gray-900 mb-8'>Get In Touch</h2>
          <p className='text-lg text-gray-600 mb-8'>
            Have questions about the project or want to collaborate? We&apos;d love to hear from you.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto'>
            <div className='bg-gray-50 rounded-lg p-6'>
              <div className='text-4xl mb-4'>📧</div>
              <h3 className='font-semibold text-gray-900 mb-2'>Email</h3>
              <p className='text-gray-600 mb-3'>support@yojanasaathi.gov.in</p>
              <a
                href="mailto:support@yojanasaathi.gov.in"
                className='inline-block bg-[#F19953] hover:bg-[#E68540] text-white px-6 py-2 rounded-lg transition-colors font-medium'
              >
                Send Email
              </a>
            </div>

            <div className='bg-gray-50 rounded-lg p-6'>
              <div className='text-4xl mb-4'>🏛️</div>
              <h3 className='font-semibold text-gray-900 mb-2'>Institution</h3>
              <p className='text-gray-600 mb-3'>BMS College of Engineering<br />Bangalore, Karnataka</p>
              <span className='text-sm text-gray-500'>Information Science Department</span>
            </div>
          </div>

          <div className='mt-12'>
            <Link
              href="/"
              className='inline-block bg-[#2660A4] hover:bg-[#1e4a7a] text-white px-8 py-3 rounded-lg transition-colors font-medium mr-4'
            >
              Explore Schemes
            </Link>
            <Link
              href="/about"
              className='inline-block border-2 border-[#2660A4] text-[#2660A4] hover:bg-[#2660A4] hover:text-white px-8 py-3 rounded-lg transition-colors font-medium'
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page
