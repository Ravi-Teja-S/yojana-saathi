import React from 'react'
import Link from 'next/link'
import { connectDB } from '@/lib/mongodb'
import Scheme from '@/models/Scheme'

interface PageProps {
  params: Promise<{
    category: string
  }>
}

const page = async ({ params }: PageProps) => {
  const { category } = await params

  await connectDB()
  const schemes = await Scheme.find({ category }).lean()

  const categoryNameMap: { [key: string]: string } = {
    education: 'Education & Scholarships',
    business: 'Skill Development & Entrepreneurship',
    healthcare: 'Healthcare & Wellness',
    housing: 'Housing & Construction',
    'social-welfare': 'Social Welfare',
    employment: 'Employment & Skill Development',
    'women-empowerment': 'Women Empowerment',
  }

  const categoryName = categoryNameMap[category] || 'Schemes'

  return (
    <div className='w-full'>
      {/* Hero Section */}
      <section className='bg-linear-to-r from-[#2660A4] to-[#1e4a7a] text-white py-12 px-8'>
        <div className='max-w-6xl mx-auto'>
          <Link href='/schemes' className='text-gray-200 hover:text-white mb-4 inline-block'>
            ← Back to Categories
          </Link>
          <h1 className='text-4xl font-bold mb-2'>{categoryName}</h1>
          <p className='text-gray-100'>Browse all available schemes in this category</p>
        </div>
      </section>

      {/* Schemes Grid */}
      <section className='py-16 px-8 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {schemes.length > 0 ? (
              schemes.map((scheme) => (
                <Link href={`/schemes/${category}/${scheme.id}`} key={scheme.id}>
                  <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full'>
                    {/* Header */}
                    <div className='bg-linear-to-r from-[#F19953] to-[#E68540] h-16 flex items-center px-6'>
                      <span className='text-white font-bold text-sm'>Browse Scheme</span>
                    </div>

                    {/* Content */}
                    <div className='p-6'>
                      <h3 className='text-xl font-bold text-gray-900 mb-3'>
                        {scheme.name}
                      </h3>
                      <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                        {scheme.description}
                      </p>

                      <div className='space-y-3 mb-4 border-t border-gray-200 pt-4'>
                        <div>
                          <p className='text-xs font-semibold text-gray-500 mb-1'>ELIGIBILITY</p>
                          <p className='text-sm text-gray-700'>{scheme.eligibility}</p>
                        </div>
                        <div>
                          <p className='text-xs font-semibold text-gray-500 mb-1'>BENEFIT</p>
                          <p className='text-sm text-gray-700'>{scheme.benefit}</p>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 text-[#2660A4] font-semibold text-sm'>
                        View Details
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className='col-span-full text-center py-12'>
                <p className='text-gray-500 text-lg'>No schemes found in this category</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default page
