import { z } from "zod"

export const VenueParser = z.object({
  venueid: z.number(),
  zipcode: z.string().nullable(),
  country: z.string().nullable(),
  state: z.string().nullable(),
  name: z.string().nullable(),
  city: z.string().nullable(),
  address1: z.string().nullable(),
  fullname: z.string().nullable(),
})

export const APIExhibitionParser = z.object({
  id: z.number(),
  begindate: z.string(),
  enddate: z.string(),
  title: z.string(),
  url: z.string().url(),
  shortdescription: z.string().nullable(),
  description: z.string().nullable(),
  venues: VenueParser.array(),
})

export const DBExhibitionParser = z.object({
  id: z.number(),
  begindate: z.string(),
  enddate: z.string(),
  title: z.string(),
  url: z.string().url(),
  shortdescription: z.string().nullable(),
  description: z.string().nullable(),
  venues: VenueParser,
})

export type APIExhibition = z.infer<typeof APIExhibitionParser>
export type DBExhibition = z.infer<typeof DBExhibitionParser>
export type Venue = z.infer<typeof VenueParser>
