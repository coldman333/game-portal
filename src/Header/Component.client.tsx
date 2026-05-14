'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {

  return (
    <header
      className={cn('relative z-20 w-full border-b border-zinc-900 bg-black/80 backdrop-blur')}
    >
      <div className="container px-4">
        <div className="flex h-24 items-center justify-between gap-6">
          <Link aria-label=" Games portal home" className="flex items-center" href="/">
            <Image
              alt=" Games portal"
              className="h-[64px] w-[85px] object-contain"
              height={85}
              loading="eager"
              priority
              src="/images/header-logo.png"
              width={85}
            />
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
