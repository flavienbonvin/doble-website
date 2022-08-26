// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import {
  getCurrentlyRunningExhibitions,
  updateSupabaseExhibitions,
} from "../../service/exhibitions"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { authorization } = req.headers
  if (!authorization || authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end()
  }

  const exhibitions = await getCurrentlyRunningExhibitions()

  try {
    await updateSupabaseExhibitions(exhibitions)
  } catch (e: any) {
    return res.status(500).send(e.message ?? "Unexpected error")
  }

  res.status(200).end()
}
