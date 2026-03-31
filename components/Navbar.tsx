import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-linear-to-r from-[#2660A4] to-[#1e4a7a] px-8 py-4 shadow-lg'>
      <h1 className='font-bold text-2xl text-white hover:text-[#F19953] transition-colors cursor-pointer'>
        Yojana Saathi
      </h1>
      <div className='flex gap-8'>
        <Link href="/" className='text-white font-medium hover:text-[#F19953] transition-colors duration-200 relative group'>
          Home
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#F19953] group-hover:w-full transition-all duration-300'></span>
        </Link>
        <Link href="/about" className='text-white font-medium hover:text-[#F19953] transition-colors duration-200 relative group'>
          About
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#F19953] group-hover:w-full transition-all duration-300'></span>
        </Link>
        <Link href="/schemes" className='text-white font-medium hover:text-[#F19953] transition-colors duration-200 relative group'>
          Schemes
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#F19953] group-hover:w-full transition-all duration-300'></span>
        </Link>
        <Link href="/contact" className='text-white font-medium hover:text-[#F19953] transition-colors duration-200 relative group'>
          Contact
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#F19953] group-hover:w-full transition-all duration-300'></span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
