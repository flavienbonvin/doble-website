// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getAllExibitions } from "../../service/exibitions"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  try {
    const exibitions = await getAllExibitions()
    res.setHeader("Cache-Control", "public,max-age=60")
    res.status(200).json(exibitions)
  } catch (e: any) {
    return res.status(500).send(e.message ?? "Unexpected error")
  }
}
