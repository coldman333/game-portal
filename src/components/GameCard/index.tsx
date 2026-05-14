'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Game } from '@/payload-types'

import { Media } from '@/components/Media'

export type GameCardData = Pick<Game, 'slug' | 'title' | 'image' | 'subtitle'>

export const GameCard: React.FC<{
  className?: string
  game: GameCardData
}> = (props) => {
  const { className, game } = props
  const { slug, title, image, subtitle } = game

  const href = `/games/${slug}`

  return (
    <Link href={href} >
      <article
        className={cn(
          'group bg-zinc-900 border border-zinc-800 rounded-[10px] overflow-hidden hover:cursor-pointer transition-all duration-300 hover:border-zinc-700',
          className,
        )}
      >
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          {image && typeof image !== 'string' && (
            <div className="relative w-full h-full">
              <Media resource={image} size="100vw" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-[#e59450] rounded-full w-16 h-16 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black"
                  >
                    <path
                      d="M8 5V19L19 12L8 5Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col gap-1">
          <p className="text-[#e59450] min-h-6 text-sm leading-5 tracking-[-0.15px]">
              { subtitle && subtitle }
            </p>
          {title && (
            <h3 className="text-white text-base leading-6 tracking-[-0.31px] font-normal">
              {title}
            </h3>
          )}
        </div>
      </article>
    </Link>
  )
}

