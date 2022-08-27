import { Venue } from "../models/ApiExhibitions"
import NodeGeocoder from "node-geocoder"

const options = {
  provider: "google",
  apiKey: process.env.GEOCODE_API_KEY,
}

// @ts-ignore
const geocoder = NodeGeocoder(options)

export const getGeoCodeFromVenue = async (venue: Venue) => {
  if (!venue) return null

  return await geocoder.geocode({
    address: venue.address1 ?? "",
    country: venue.country ?? "",
    zipcode: venue.zipcode ?? "",
  })
}
