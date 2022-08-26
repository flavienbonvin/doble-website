import { z } from "zod"

export const APIExibitionParser = z.object({
  id: z.number(),
  begindate: z.string(),
  enddate: z.string(),
  title: z.string(),
  url: z.string().url(),
  shortdescription: z.string().nullable(),
  description: z.string().nullable(),
  venues: z
    .object({
      venueid: z.number(),
      zipcode: z.string().nullable(),
      country: z.string().nullable(),
      state: z.string().nullable(),
      name: z.string().nullable(),
      city: z.string().nullable(),
      address1: z.string().nullable(),
      fullname: z.string().nullable(),
    })
    .array(),
})

export type APIExibition = z.infer<typeof APIExibitionParser>
