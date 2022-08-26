// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import {
  getCurrentlyRunningExibitions,
  updateSupabaseExibitions,
} from "../../service/exibitions"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { secret } = req.body
  if (!secret || secret !== process.env.CRON_SECRET) {
    return res.status(401).end()
  }

  const exibitions = await getCurrentlyRunningExibitions()

  try {
    await updateSupabaseExibitions(exibitions)
  } catch (e: any) {
    return res.status(500).send(e.message ?? "Unexpected error")
  }

  res.status(200).end()
}
