'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Maximize2, X } from 'lucide-react'

import type { Game } from '@/payload-types'

export type GameCardData = Pick<Game, 'slug' | 'title' | 'image' | 'demoUrl'>

export const GameDetailsCard: React.FC<{
  className?: string
  game: GameCardData
}> = (props) => {
  const { className, game } = props
  const { slug, title, image, demoUrl } = game

  const [isFullscreen, setIsFullscreen] = useState(false)

  const exitFullscreen = useCallback(() => setIsFullscreen(false), [])

  useEffect(() => {
    if (!isFullscreen) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exitFullscreen()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isFullscreen, exitFullscreen])

  return (
    <>
      <div className={`relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-black ${className ?? ''}`}>
        {demoUrl && (
          <>
            <iframe src={demoUrl} width="100%" height="100%" className="absolute inset-0" />
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-md bg-black/60 px-3 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
              aria-label="Enter fullscreen"
            >
              <Maximize2 size={14} />
              Fullscreen
            </button>
          </>
        )}
      </div>

      {isFullscreen && demoUrl && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          <div className="flex justify-end p-3">
            <button
              onClick={exitFullscreen}
              className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Exit fullscreen (Escape)"
            >
              <X size={14} />
              Close
            </button>
          </div>
          <iframe src={demoUrl} className="flex-1 w-full" />
        </div>
      )}

      <div className="p-4 flex flex-col gap-1">
        {title && (
          <h3 className="text-white text-base leading-6 tracking-[-0.31px] font-normal">
            {title}
          </h3>
        )}
      </div>
    </>
  )
}

