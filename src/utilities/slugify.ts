// utilities/slugify.ts
export const slugify = (str: string): string => {
  if (!str) return str
  const cyrillicToLatin: { [key: string]: string } = {
    а: 'a',
    б: 'b',
    в: 'v',
    ґ: 'g',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    є: 'e',
    ж: 'zh',
    з: 'z',
    и: 'y',
    і: 'i',
    ї: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }

  return str
    .toLowerCase()
    .split('')
    .map((char) => cyrillicToLatin[char] || char)
    .join('')
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
