import { default as sanitizeString } from "sanitize-html"

export const sanitize = (input: string): string => {
  return sanitizeString(input, {
    allowedTags: [],
    allowedAttributes: {},
  })
}
