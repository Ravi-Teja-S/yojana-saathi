import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='w-full'>
      {/* Hero Section */}
      <section className='bg-linear-to-r from-[#2660A4] to-[#1e4a7a] text-white py-20 px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl font-bold mb-6'>About Yojana Saathi</h1>
          <p className='text-xl text-gray-100'>
            Empowering Citizens Through Intelligent Government Scheme Assistance
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-16 px-8 bg-white'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-4xl font-bold text-gray-900 mb-8 text-center'>Our Mission</h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-6'>
            Yojana Saathi is an AI-powered government scheme assistant designed to bridge the gap between citizens and government welfare programs. Our mission is to empower every citizen in Karnataka by providing easy, accessible, and intelligent assistance in understanding and navigating various government schemes.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed'>
            We believe that quality information should be accessible to everyone. Whether you're a student, entrepreneur, farmer, or homemaker, Yojana Saathi is here to help you find the schemes that benefit you most.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className='py-16 px-8 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-4xl font-bold text-gray-900 mb-12 text-center'>What We Offer</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* AI Assistant */}
            <div className='bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow'>
              <div className='text-5xl mb-4'>🤖</div>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>AI-Powered Assistant</h3>
              <p className='text-gray-700 leading-relaxed'>
                Our intelligent chatbot can answer all your questions about government schemes. Get instant responses to queries about scheme eligibility, documentation requirements, benefits, and application procedures.
              </p>
            </div>

            {/* Voice Agent */}
            <div className='bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow'>
              <div className='text-5xl mb-4'>📞</div>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Voice Agent Support</h3>
              <p className='text-gray-700 leading-relaxed'>
                Prefer talking? Our integrated voice agent allows you to call and get personalized assistance. Simply call and describe your needs, and our AI agent will provide tailored recommendations for schemes that match your profile.
              </p>
            </div>

            {/* Comprehensive Database */}
            <div className='bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow'>
              <div className='text-5xl mb-4'>📚</div>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Comprehensive Database</h3>
              <p className='text-gray-700 leading-relaxed'>
                Access detailed information about hundreds of government schemes covering education, business, healthcare, housing, agriculture, and more. Stay updated with the latest information.
              </p>
            </div>

            {/* Personalized Recommendations */}
            <div className='bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow'>
              <div className='text-5xl mb-4'>🎯</div>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Personalized Recommendations</h3>
              <p className='text-gray-700 leading-relaxed'>
                Tell us about yourself, and our AI will suggest the most relevant schemes based on your eligibility criteria, background, and needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-16 px-8 bg-white'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-4xl font-bold text-gray-900 mb-12 text-center'>How It Works</h2>
          
          <div className='space-y-8'>
            <div className='flex gap-6 items-start'>
              <div className='bg-linear-to-r from-[#2660A4] to-[#1e4a7a] text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0'>
                1
              </div>
              <div>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>Ask Your Question</h3>
                <p className='text-gray-700 leading-relaxed'>
                  Use our text chatbot or call our voice agent to ask any question about government schemes. Whether it's about eligibility, benefits, or application process, we're here to help.
                </p>
              </div>
            </div>

            <div className='flex gap-6 items-start'>
              <div className='bg-linear-to-r from-[#F19953] to-[#E68540] text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0'>
                2
              </div>
              <div>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>Get Intelligent Answers</h3>
                <p className='text-gray-700 leading-relaxed'>
                  Our AI analyzes your query and provides detailed, accurate answers. Our voice agent can have natural conversations and understand context to give personalized recommendations.
                </p>
              </div>
            </div>

            <div className='flex gap-6 items-start'>
              <div className='bg-linear-to-r from-[#C47335] to-[#56351E] text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0'>
                3
              </div>
              <div>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>Apply and Benefit</h3>
                <p className='text-gray-700 leading-relaxed'>
                  Armed with the information and guidance, you can confidently apply for the schemes that match your needs and start reaping their benefits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className='py-16 px-8 bg-gray-50'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-4xl font-bold text-gray-900 mb-12 text-center'>Meet the Team</h2>
          
          <div className='bg-white rounded-lg shadow-lg p-12'>
            <div className='text-6xl text-center mb-6'>👨‍🎓👩‍🎓</div>
            <h3 className='text-3xl font-bold text-gray-900 mb-4 text-center'>
              BMSCE Information Science &amp; Engineering
            </h3>
            <p className='text-xl text-gray-700 leading-relaxed mb-4 text-center'>
              Yojana Saathi is proudly developed by talented students and faculty from the Information Science and Engineering branch at BMS College of Engineering (BMSCE).
            </p>
            <p className='text-lg text-gray-700 leading-relaxed text-center'>
              Our team combines expertise in artificial intelligence, machine learning, natural language processing, and software engineering to create a solution that truly makes a difference in people's lives.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='py-16 px-8 bg-white'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-4xl font-bold text-gray-900 mb-12 text-center'>Why Choose Yojana Saathi?</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='flex gap-4'>
              <div className='text-3xl'>✓</div>
              <div>
                <h4 className='text-xl font-bold text-gray-900 mb-2'>Accurate Information</h4>
                <p className='text-gray-700'>Latest and verified information about government schemes</p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='text-3xl'>✓</div>
              <div>
                <h4 className='text-xl font-bold text-gray-900 mb-2'>24/7 Availability</h4>
                <p className='text-gray-700'>Get help anytime, day or night through chatbot or voice agent</p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='text-3xl'>✓</div>
              <div>
                <h4 className='text-xl font-bold text-gray-900 mb-2'>Completely Free</h4>
                <p className='text-gray-700'>No charges for using our services - helping citizens is our goal</p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='text-3xl'>✓</div>
              <div>
                <h4 className='text-xl font-bold text-gray-900 mb-2'>User-Friendly Interface</h4>
                <p className='text-gray-700'>Simple and intuitive design for easy navigation</p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='text-3xl'>✓</div>
              <div>
                <h4 className='text-xl font-bold text-gray-900 mb-2'>Multi-Language Support</h4>
                <p className='text-gray-700'>Accessible in multiple languages for wider reach</p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='text-3xl'>✓</div>
              <div>
                <h4 className='text-xl font-bold text-gray-900 mb-2'>Personalized Experience</h4>
                <p className='text-gray-700'>AI learns your preferences for better recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-linear-to-r from-[#2660A4] to-[#1e4a7a] text-center'>
        <h2 className='text-3xl font-bold text-white mb-6'>Ready to Find Your Perfect Scheme?</h2>
        <p className='text-gray-100 mb-8 text-lg max-w-2xl mx-auto px-8'>
          Let Yojana Saathi guide you through the world of government schemes and find opportunities that can transform your life.
        </p>
        <div className='flex gap-4 justify-center flex-wrap'>
          <Link
            href='/schemes'
            className='inline-block bg-white text-[#2660A4] font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300'
          >
            Explore Schemes
          </Link>
          <Link
            href='/contact'
            className='inline-block bg-[#F19953] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#E68540] transition-colors duration-300'
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

export default page
