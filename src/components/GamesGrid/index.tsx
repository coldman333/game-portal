import { cn } from '@/utilities/ui'
import React from 'react'

import { GameCard, GameCardData } from '@/components/GameCard'
import {Game} from "@/payload-types";

export type Props = {
  games: GameCardData[] | Game[]
}

export const GamesGrid: React.FC<Props> = (props) => {
  const { games } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {games?.map((game, index) => {
            if (typeof game === 'object' && game !== null) {
              return (
                <GameCard key={index} game={game} />
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}



