import { Constants } from "./constant"

export const isValidUrl = (urlString: string) => {
  // If the string contains localhost, it's not a valid url
  if (urlString.includes('localhost')) return false
  try {
    return Boolean(new URL(urlString))
  } catch (e) {
    return false
  }
}

export const getKey = (key: string) =>
  `${key}-${Math.random().toString(36).substring(2, 15)}`

export const GetImageUrl = (name: string, path: string) => {
  return new URL(`../${path}${name}.jpg`, import.meta.url).href
}

export const GetThumbnailUrl = (imageName: string) => {
  const properties = imageName.split('-')
  const fileName = properties[1]
  const size = properties[2]
  const extension = properties[3]

  return new URL(
    `https://cdn.sanity.io/images/${Constants.SANITY.PROJECT_ID}/production/${fileName}-${size}.${extension}`
  ).href
}
