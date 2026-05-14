import type { Game, GamesBlock as GamesBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { GamesGrid } from '@/components/GamesGrid'

export const GamesBlock: React.FC<
  GamesBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, introContent, limit: limitFromProps, populateBy, selectedGames } = props

  const limit = limitFromProps || 6

  let games: Game[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })
    const fetchedGames = await payload.find({
      collection: 'games',
      depth: 1,
      limit,
    })

    games = fetchedGames.docs
  } else {
    if (selectedGames?.length) {
      const filteredSelectedGames = selectedGames.map((game) => {
        if (typeof game.value === 'object') return game.value
      }) as Game[]

      games = filteredSelectedGames
    }
  }

  return (
    <div id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <GamesGrid games={games} />
    </div>
  )
}



