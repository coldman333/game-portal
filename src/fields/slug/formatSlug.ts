import type { FieldHook } from 'payload'
import {slugify} from "@/utilities/slugify";

export const formatSlug = (val: string): string | undefined =>
  val
    ?.replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return slugify(value)
    }

    if (operation === 'create' || data?.slug === undefined) {
      const fallbackData = data?.[fallback]

      if (typeof fallbackData === 'string') {
        return slugify(fallbackData)
      }
    }

    return value
  }
