
import React from 'react'

import type { Game } from '@/payload-types'

export type GameCardData = Pick<Game, 'slug' | 'title' | 'image' | 'demoUrl'>

export const GameDetailsCard: React.FC<{
  className?: string
  game: GameCardData
}> = (props) => {
  const { className, game } = props
  const { slug, title, image, demoUrl } = game

  const href = `/games/${slug}`

    console.log('GameDetailsCard', game)


  return (
      <>
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          {demoUrl && (
            <div className=" bg-red-700 fixed md:static z-[9000] top-0 left-0 bottom-0 right-0 h-full md:h-[85vh]  w-fulll">
               <iframe src={demoUrl} width="100%" height="100%"></iframe>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col gap-1">
            <p className="text-[#e59450] text-sm leading-5 tracking-[-0.15px]">
             text sup title {href}
            </p>
          {title && (
            <h3 className="text-white text-base leading-6 tracking-[-0.31px] font-normal">
              {title}
            </h3>
          )}
        </div>
      </>
  )
}

