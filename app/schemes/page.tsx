import React from 'react'
import Link from 'next/link'
import { connectDB } from '@/lib/mongodb'
import Scheme from '@/models/Scheme'
import {
  GraduationCap,
  Briefcase,
  Stethoscope,
  Home,
  Users,
  Zap,
  UserRoundCheck,
  ChevronRight,
  BookOpen,
  MousePointerClick,
  FileText
} from 'lucide-react'

const page = async () => {
  await connectDB()
  const categories = await Scheme.distinct('category')

  const schemeCategories = categories.map((category: string) => {
    const categoryData: { [key: string]: any } = {
      education: {
        name: 'Education & Scholarships',
        description: 'Government schemes for students and educational support',
        icon: <GraduationCap size={32} />,
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
      },
      business: {
        name: 'Skill & Entrepreneurship',
        description: 'Vocational training and women entrepreneurship support',
        icon: <Briefcase size={32} />,
        bgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
      },
      healthcare: {
        name: 'Healthcare & Wellness',
        description: 'Health-related government schemes and benefits',
        icon: <Stethoscope size={32} />,
        bgColor: 'bg-red-50',
        iconColor: 'text-red-600',
      },
      housing: {
        name: 'Housing & Construction',
        description: 'Schemes for affordable housing and home loans',
        icon: <Home size={32} />,
        bgColor: 'bg-amber-50',
        iconColor: 'text-amber-600',
      },
      'social-welfare': {
        name: 'Social Welfare',
        description: 'Support for elderly, disabled, and underprivileged',
        icon: <Users size={32} />,
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
      },
      employment: {
        name: 'Employment Support',
        description: 'Job creation and professional skill training programs',
        icon: <Zap size={32} />,
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600',
      },
      'women-empowerment': {
        name: 'Women Empowerment',
        description: 'Schemes designed to support women professionals',
        icon: <UserRoundCheck size={32} />,
        bgColor: 'bg-pink-50',
        iconColor: 'text-pink-600',
      },
    }

    return {
      id: category,
      ...categoryData[category],
    }
  }).filter((cat: any) => cat.name) // only include categories that have UI data

  return (
    <div className='w-full bg-white font-sans'>
      {/* Hero Section */}
      <section className='bg-[#2660A4] text-white py-20 px-8 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10 pointer-events-none'>
            <div className='absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl'></div>
        </div>
        <div className='max-w-6xl mx-auto text-center relative z-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight mb-6'>Government Schemes</h1>
          <p className='text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed'>
            Empowering citizens through accessible data. Find the right central and state welfare programs tailored for you.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className='py-20 px-8 bg-slate-50'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-between items-end mb-12'>
            <div>
                <h2 className='text-3xl font-bold text-slate-900'>Explore Categories</h2>
                <div className='h-1 w-20 bg-[#2660A4] mt-2 rounded-full'></div>
            </div>
          </div>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {schemeCategories.map((category) => (
              <Link href={`/schemes/${category.id}`} key={category.id} className="group">
                <div className='h-full bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#2660A4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col'>
                  {/* Icon Box */}
                  <div className={`w-14 h-14 ${category.bgColor} ${category.iconColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className='text-lg font-bold text-slate-900 mb-2 group-hover:text-[#2660A4] transition-colors'>
                    {category.name}
                  </h3>
                  <p className='text-slate-500 text-sm leading-relaxed mb-6 grow'>
                    {category.description}
                  </p>
                  
                  <div className='flex items-center text-sm font-semibold text-[#2660A4] group-hover:translate-x-1 transition-transform'>
                    View Schemes
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Info Section */}
      <section className='py-24 px-8 bg-white border-t border-slate-100'>
        <div className='max-w-5xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-slate-900 mb-16'>How it works</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#2660A4] mb-6'>
                <MousePointerClick size={28} />
              </div>
              <h3 className='text-xl font-bold text-slate-900 mb-3'>Select Category</h3>
              <p className='text-slate-500 text-sm leading-relaxed'>Filter schemes by your specific demographic or interest area.</p>
            </div>
            <div className='flex flex-col items-center relative'>
              {/* Optional Connector line for desktop */}
              <div className='hidden md:block absolute top-8 -right-6 w-12 h-px bg-slate-200'></div>
              <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#2660A4] mb-6'>
                <BookOpen size={28} />
              </div>
              <h3 className='text-xl font-bold text-slate-900 mb-3'>Browse Details</h3>
              <p className='text-slate-500 text-sm leading-relaxed'>Check eligibility, benefits, and required documentation instantly.</p>
            </div>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#2660A4] mb-6'>
                <FileText size={28} />
              </div>
              <h3 className='text-xl font-bold text-slate-900 mb-3'>Read Guidelines</h3>
              <p className='text-slate-500 text-sm leading-relaxed'>Access official PDFs and apply directly through verified links.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page