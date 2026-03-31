import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-linear-to-r from-[#C47335] to-[#56351E] text-white mt-16'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-8 py-12 grid grid-cols-3 gap-8'>
        {/* About Section */}
        <div>
          <h3 className='font-bold text-xl mb-4 text-white'>Yojana Saathi</h3>
          <p className='text-gray-100 text-sm leading-relaxed'>
            Empowering citizens with easy access to government schemes and programs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='font-bold text-lg mb-4 text-white'>Quick Links</h3>
          <ul className='space-y-2'>
            <li><Link href="/" className='text-gray-100 hover:text-[#F19953] transition-colors'>Home</Link></li>
            <li><Link href="/about" className='text-gray-100 hover:text-[#F19953] transition-colors'>About</Link></li>
            <li><Link href="/schemes" className='text-gray-100 hover:text-[#F19953] transition-colors'>Schemes</Link></li>
            <li><Link href="/contact" className='text-gray-100 hover:text-[#F19953] transition-colors'>Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className='font-bold text-lg mb-4 text-white'>Contact</h3>
          <p className='text-gray-100 text-sm mb-2'>Karnataka e-Governance</p>
          <p className='text-gray-100 text-sm mb-3'>support@yojanasaathi.gov.in</p>
          <a href="mailto:support@yojanasaathi.gov.in" className='inline-block bg-[#F19953] hover:bg-[#E68540] text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm'>
            Get in Touch
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-orange-200 opacity-30'></div>

      {/* Bottom Footer */}
      <div className='max-w-7xl mx-auto px-8 py-6 flex justify-between items-center text-gray-100 text-sm'>
        <p>© 2026 Yojana Saathi. All rights reserved.</p>
        <div className='flex gap-6'>
          <span>Built by <Link href="#" className='hover:text-[#F19953] transition-colors font-medium'>BMSCE Portfolio</Link></span>
          <span>|</span>
          <span><Link href="#" className='hover:text-[#F19953] transition-colors font-medium'>Karnataka e-Governance</Link></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
