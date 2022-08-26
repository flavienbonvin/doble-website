import { DB_TABLE_EXHIBITION, DB_TABLE_VENUE } from "../constants/db"
import { APIExhibition, APIExhibitionParser } from "../models/ApiExhibitions"
import { supabase } from "../utils/supabaseClient"

export const getCurrentlyRunningExhibitions = async () => {
  const data = await fetch(
    `https://api.harvardartmuseums.org/exhibition?apikey=${process.env.EXHIBITIONS_API_KEY}&status=current`
  ).then((res) => res.json())

  return data.records.map((item: any) => APIExhibitionParser.parse(item))
}

export const updateSupabaseExhibitions = async (
  exhibitions: APIExhibition[]
) => {
  exhibitions.forEach(async (exhibition) => {
    const venue = exhibition.venues[0]
    const { error: venuesError } = await supabase
      .from(DB_TABLE_VENUE)
      .upsert(venue)
    if (venuesError) throw new Error("Error while inserting venues")

    const tempExhibition: Partial<APIExhibition> = Object.assign({}, exhibition)
    delete tempExhibition["venues"]

    const { error: exihbitionsError } = await supabase
      .from(DB_TABLE_EXHIBITION)
      .upsert([{ venueid: venue.venueid, ...tempExhibition }])
    if (exihbitionsError) throw new Error("Error while inserting exhibitions")
  })
}

export const getAllExhibitions = async () => {
  const now = new Date()
  const { data, error } = await supabase
    .from(DB_TABLE_EXHIBITION)
    .select(`*, venues (*)`)
    .gte("enddate", `${now.toISOString().split("T")[0]}`)
  console.log(error)
  if (error) throw new Error("Error while getting exhibitions")

  return data
}
