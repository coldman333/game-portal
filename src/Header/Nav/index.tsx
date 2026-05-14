'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'

const buttonClasses =
  'rounded-lg bg-[#e59450] px-4 py-2 text-sm font-medium tracking-tight text-black transition hover:bg-[#f0a360]'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const ctaLink = data?.cta

  return (
    <nav className="flex items-center gap-6">
      {navItems.length > 0 && (
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                appearance="inline"
                className="transition hover:text-white"
                key={i}
                {...link}
              />
            )
          })}
        </div>
      )}

      {ctaLink ? (
        <CMSLink appearance="inline" className={buttonClasses} {...ctaLink} />
      ) : (
        <Link className={buttonClasses} href="/contact">
          Contact Us
        </Link>
      )}
    </nav>
  )
}
