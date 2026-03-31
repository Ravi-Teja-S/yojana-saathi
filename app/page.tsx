'use client'

import React from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const page = () => {
  const carouselSlides = [
    {
      title: 'Government Schemes for Everyone',
      description: 'Discover and apply for government schemes designed to help you and your family',
      cta: 'Go to Schemes',
      link: '/schemes',
      image: '/carousel-1.png',
      gradient: 'from-[#2660A4] to-[#1e4a7a]',
    },
    {
      title: 'Ask About a Scheme',
      description: 'Have questions? Get answers from our experts about available government programs',
      cta: 'Ask Now',
      link: '/contact',
      image: '/carousel-2.png',
      gradient: 'from-[#C47335] to-[#56351E]',
    },
    {
      title: 'Empower Your Future',
      description: 'Learn how government initiatives can transform your life and opportunities',
      cta: 'Learn More',
      link: '/about',
      image: '/carousel-3.png',
      gradient: 'from-[#F19953] to-[#E68540]',
    },
  ]

  return (
    <div className='w-full'>
      {/* Hero Section with Carousel */}
      <section className='w-full h-screen flex items-center justify-center bg-gray-900'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className='w-full h-full'
        >
          {carouselSlides.map((slide, index) => (
            <SwiperSlide key={index} className='w-full h-full'>
              <div
                className={`bg-linear-to-r ${slide.gradient} w-full h-full flex flex-col items-center justify-center text-center px-8 relative bg-cover bg-center`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${slide.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className='bg-opacity-40 backdrop-blur-xs px-12 py-8 rounded-xl max-w-2xl'>
                  <h1 className='text-5xl font-bold text-white mb-6 max-w-3xl relative z-10'>
                    {slide.title}
                  </h1>
                  <p className='text-xl text-gray-100 mb-10 max-w-2xl relative z-10'>
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className='bg-white text-[#2660A4] font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-lg relative z-10'
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Summary Sections */}
      <section className='py-20 px-8 bg-gray-50'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-4xl font-bold text-center mb-16 text-gray-900'>
            Explore Our Services
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* About Card */}
            <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-linear-to-r from-[#2660A4] to-[#1e4a7a] h-32 flex items-center justify-center'>
                <span className='text-5xl'>ℹ️</span>
              </div>
              <div className='p-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>About Us</h3>
                <p className='text-gray-600 mb-6 leading-relaxed'>
                  Learn more about Yojana Saathi and our mission to make government schemes accessible to every citizen in Karnataka.
                </p>
                <Link
                  href='/about'
                  className='inline-block bg-linear-to-r from-[#2660A4] to-[#1e4a7a] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-300'
                >
                  Know More →
                </Link>
              </div>
            </div>

            {/* Schemes Card */}
            <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-linear-to-r from-[#F19953] to-[#E68540] h-32 flex items-center justify-center'>
                <span className='text-5xl'>📋</span>
              </div>
              <div className='p-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>Government Schemes</h3>
                <p className='text-gray-600 mb-6 leading-relaxed'>
                  Browse through a comprehensive list of government schemes and programs designed to support your growth and development.
                </p>
                <Link
                  href='/schemes'
                  className='inline-block bg-linear-to-r from-[#F19953] to-[#E68540] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-300'
                >
                  Explore Schemes →
                </Link>
              </div>
            </div>

            {/* Contact Card */}
            <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-linear-to-r from-[#C47335] to-[#56351E] h-32 flex items-center justify-center'>
                <span className='text-5xl'>📞</span>
              </div>
              <div className='p-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>Get in Touch</h3>
                <p className='text-gray-600 mb-6 leading-relaxed'>
                  Have questions about schemes? Contact our support team and get personalized assistance to find the right scheme for you.
                </p>
                <Link
                  href='/contact'
                  className='inline-block bg-linear-to-r from-[#C47335] to-[#56351E] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-300'
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-linear-to-r from-[#2660A4] to-[#1e4a7a] text-center'>
        <h2 className='text-3xl font-bold text-white mb-6'>
          Ready to Find Your Scheme?
        </h2>
        <p className='text-gray-100 mb-8 text-lg max-w-2xl mx-auto px-8'>
          Start exploring government schemes that can benefit you and your family today.
        </p>
        <Link
          href='/schemes'
          className='inline-block bg-[#F19953] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#E68540] transition-colors duration-300'
        >
          Browse All Schemes
        </Link>
      </section>
    </div>
  )
}

export default page
