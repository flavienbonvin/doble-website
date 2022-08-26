import { APIExibition, APIExibitionParser } from "../models/ApiExibitions"
import { supabase } from "../utils/supabaseClient"

export const getCurrentlyRunningExibitions = async () => {
  const data = await fetch(
    `https://api.harvardartmuseums.org/exhibition?apikey=${process.env.EXIBITION_API_KEY}&status=current`
  ).then((res) => res.json())

  return data.records.map((item: any) => APIExibitionParser.parse(item))
}

export const updateSupabaseExibitions = async (exibitions: APIExibition[]) => {
  exibitions.forEach(async (exibition) => {
    const venue = exibition.venues[0]
    const { error: venuesError } = await supabase.from("venues").upsert(venue)
    if (venuesError) throw new Error("Error while inserting venues")

    const tempExibition: Partial<APIExibition> = Object.assign({}, exibition)
    delete tempExibition["venues"]

    const { error: exibitionsError } = await supabase
      .from("exibitions")
      .upsert([{ venueid: venue.venueid, ...tempExibition }])
    if (exibitionsError) throw new Error("Error while inserting exibitions")
  })
}

export const getAllExibitions = async () => {
  const now = new Date()
  const { data, error } = await supabase
    .from("exibitions")
    .select(`*, venues (*)`)
    .gte("enddate", `${now.toISOString().split("T")[0]}`)
  console.log(error)
  if (error) throw new Error("Error while getting exibitions")

  return data
}
