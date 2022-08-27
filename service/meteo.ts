import { DBExhibition } from "../models/ApiExhibitions"
import { getGeoCodeFromVenue } from "./geocode"

export const mergeExhibitionMeteo = (
  exhibitions: DBExhibition[],
  meteoData: any[]
) => {
  return exhibitions.map((exhibition, index) => {
    const formattedExhibition: any = Object.assign({}, exhibition)
    const meteo = meteoData[index]
    if (!meteo) {
      formattedExhibition.meteo = null
      return formattedExhibition
    }

    formattedExhibition.meteo = meteo.daily.slice(0, 3)
    return formattedExhibition
  })
}

export const getMeteoForExhibitions = async (exhibitions: DBExhibition[]) => {
  const resGeocode = await getGeoCodeArray(exhibitions)
  return await getMeteoArray(resGeocode)
}

const getGeoCodeArray = async (exhibitions: DBExhibition[]) => {
  const promisesGeocode: any[] = []

  exhibitions.forEach((exhibition) => {
    promisesGeocode.push(getGeoCodeFromVenue(exhibition.venues))
  })

  return await Promise.all(promisesGeocode)
}

const getMeteoArray = async (geocodes: any[]) => {
  const promiseMeteo: any[] = []

  geocodes.forEach((geocode) => {
    if (Array.isArray(geocode) && !geocode.length) {
      promiseMeteo.push(null)
      return
    }

    const { latitude, longitude } = geocode[0]
    if (!latitude || !longitude) {
      promiseMeteo.push(null)
    }

    promiseMeteo.push(
      fetch(getMeteoUrl(latitude, longitude)).then((res) => res.json())
    )
  })

  return await Promise.all(promiseMeteo)
}
const getMeteoUrl = (lat: number, lon: number) => {
  return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&exclude=current,minutely,hourly,alerts&lon=${lon}&appid=60b4b25d63fe35038b085aa864d796dc`
}
