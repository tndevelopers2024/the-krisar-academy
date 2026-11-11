import React from 'react'

const Strip = () => {
  return (
    <div className='flex items-center justify-center h-12 bg-brand-secondary overflow-hidden px-4'>
      <div className='flex items-center whitespace-nowrap animate-marquee'>
        <p className="text-sm md:text-base font-bold text-brand-primary tracking-wide">
          Admissions Open from Pre-KG to Grade 12 | For Inquiries & Campus Visits: <a href="tel:+917540088387" className='font-black underline underline-offset-4 hover:opacity-80 transition-opacity'>+91 7540088387</a>
        </p>
      </div>
    </div>
  )
}

export default Strip