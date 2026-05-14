import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateGame: CollectionAfterChangeHook = ({ doc, req, operation }) => {
  if (req.context) {
    if (operation === 'create' || operation === 'update') {
      revalidateTag('games')
    }
  }
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ req }) => {
  if (req.context) {
    revalidateTag('games')
  }
}



