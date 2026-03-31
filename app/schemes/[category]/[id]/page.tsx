'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import SchemeChatbot from '@/components/SchemeChatbot'

const page = () => {
  const params = useParams()
  const category = params.category as string
  const id = params.id as string
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [scheme, setScheme] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const response = await fetch(`/api/schemes/${category}/${id}`)
        if (!response.ok) {
          throw new Error('Scheme not found')
        }
        const data = await response.json()
        setScheme(data)
      } catch (error) {
        console.error('Error fetching scheme:', error)
      } finally {
        setLoading(false)
      }
    }

    if (category && id) {
      fetchScheme()
    }
  }, [category, id])

  if (loading) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#2660A4] mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading scheme details...</p>
        </div>
      </div>
    )
  }

  if (!scheme) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Scheme Not Found</h1>
          <p className='text-gray-600 mb-6'>The requested scheme could not be found.</p>
          <Link href={`/schemes/${category}`} className='text-[#2660A4] hover:underline'>
            ← Back to {category} schemes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full'>
      {/* Navigation */}
      <section className='bg-linear-to-r from-[#2660A4] to-[#1e4a7a] text-white py-8 px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex gap-2 text-sm mb-4'>
            <Link href='/schemes' className='hover:text-blue-200 transition-colors duration-200 cursor-pointer'>
              Schemes
            </Link>
            <span>/</span>
            <Link href={`/schemes/${category}`} className='hover:text-blue-200 transition-colors duration-200 cursor-pointer'>
              {category.replace('-', ' ').toUpperCase()}
            </Link>
            <span>/</span>
            <span className='text-gray-200'>{scheme.name}</span>
          </div>
          <h1 className='text-4xl font-bold'>{scheme.name}</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className='py-8 px-8 bg-gray-50'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Side - Details */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-lg p-6 sticky top-8'>
              <h2 className='text-xl font-bold text-gray-900 mb-6'>Scheme Details</h2>

              {/* Eligibility */}
              <div className='mb-6 pb-6 border-b border-gray-200'>
                <h3 className='font-bold text-gray-900 mb-2 flex items-center gap-2'>
                  Eligibility
                </h3>
                <p className='text-gray-700 text-sm'>{scheme.eligibility}</p>
              </div>

              {/* Benefits */}
              <div className='mb-6 pb-6 border-b border-gray-200'>
                <h3 className='font-bold text-gray-900 mb-2 flex items-center gap-2'>
                 Benefits
                </h3>
                <p className='text-gray-700 text-sm'>{scheme.benefit}</p>
              </div>

              {/* Application Process */}
              <div className='mb-6 pb-6 border-b border-gray-200'>
                <h3 className='font-bold text-gray-900 mb-2 flex items-center gap-2'>
                  Application
                </h3>
                <p className='text-gray-700 text-xs whitespace-pre-line'>{scheme.applicationProcess}</p>
              </div>

              {/* Contact */}
              <div>
                <h3 className='font-bold text-gray-900 mb-2 flex items-center gap-2'>
                  Contact
                </h3>
                <p className='text-gray-700 text-xs whitespace-pre-line'>{scheme.contactInfo}</p>
              </div>

              {/* Action Buttons */}
              <div className='mt-8 space-y-3'>
                <a
                  href='#apply'
                  className='w-full inline-block bg-linear-to-r from-[#2660A4] to-[#1e4a7a] text-white font-bold py-3 rounded-lg text-center transform hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer'
                >
                  Apply Now
                </a>
                <button
                  onClick={() => setIsChatbotOpen(true)}
                  className='w-full bg-linear-to-r from-[#F19953] to-[#E68540] text-white font-bold py-3 rounded-lg text-center transform hover:scale-105 hover:shadow-lg hover:from-[#E68540] hover:to-[#D57035] transition-all duration-300 ease-in-out cursor-pointer'
                >
                  Ask a Question
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - PDF Viewer & Description */}
          <div className='lg:col-span-2'>
            {/* Description */}
            <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>About This Scheme</h2>
              <p className='text-gray-700 leading-relaxed'>{scheme.fullDetails}</p>
            </div>

            {/* PDF Viewer */}
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Official Guidelines</h2>
              <div className='mb-4'>
                  <button
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = scheme.pdfFile
                      link.download = scheme.name + '.pdf'
                      link.click()
                    }}
                    className='inline-block bg-[#2660A4] text-white font-semibold px-6 py-2 rounded-lg transform hover:scale-105 hover:shadow-lg hover:bg-[#1e4a7a] transition-all duration-300 ease-in-out mb-4 cursor-pointer'
                  >
                    Download PDF
                  </button>
                <iframe
                  src={`${scheme.pdfFile}#toolbar=1`}
                  width='100%'
                  height='600px'
                  className='border-none'
                  title='Scheme Guidelines PDF'
                />
              </div>

              <p className='text-sm text-gray-600 mt-4 text-center'>
                If the PDF doesn't display, click the Download button to view it on your device
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Schemes CTA */}
      <section className='py-12 bg-linear-to-r from-[#C47335] to-[#56351E] text-white text-center'>
        <h2 className='text-3xl font-bold mb-6'>Need More Help?</h2>
        <p className='text-gray-100 mb-8 max-w-2xl mx-auto'>
          If you have any questions about this scheme or need personalized recommendations, our AI agent is ready to help!
        </p>
        <div className='flex gap-4 justify-center flex-wrap'>
          <button
            onClick={() => setIsChatbotOpen(true)}
            className='bg-white text-[#C47335] font-bold px-6 py-3 rounded-lg transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 transition-all duration-300 ease-in-out cursor-pointer'
          >
            Ask AI Assistant
          </button>
          <Link href='/schemes' className='border-2 border-white text-white font-bold px-6 py-3 rounded-lg transform hover:scale-105 hover:shadow-lg hover:bg-white hover:text-[#C47335] transition-all duration-300 ease-in-out cursor-pointer'>
            Browse Other Schemes
          </Link>
        </div>
      </section>

      {/* Chatbot Component */}
      <SchemeChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        schemeName={scheme?.name || 'Scheme'}
      />
    </div>
  )
}

export default page
