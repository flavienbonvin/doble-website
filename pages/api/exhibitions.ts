// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getAllExhibitions } from "../../service/exhibitions"
import {
  getMeteoForExhibitions,
  mergeExhibitionMeteo,
} from "../../service/meteo"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  try {
    const exhibitions = await getAllExhibitions()
    const meteoData = await getMeteoForExhibitions(exhibitions)
    const formattedData = mergeExhibitionMeteo(exhibitions, meteoData)

    res.setHeader("Cache-Control", "public,max-age=60")
    res.status(200).json(formattedData)
  } catch (e: any) {
    return res.status(500).send(e.message ?? "Unexpected error")
  }
}
