import Head from "next/head"
import Divider from "../components/Divider"
import ExhibitionCard from "../components/ExhibitonCard"
import { getAllExhibitions } from "../service/exhibitions"
import { getMeteoForExhibitions, mergeExhibitionMeteo } from "../service/meteo"

interface Props {
  exhibitions: any[]
}

const Home = ({ exhibitions }: Props) => {
  return (
    <>
      <Head>
        <title>Doble Art</title>
        <meta
          name="description"
          content="Currently running exhibitions at Doble Art"
        />
      </Head>
      <h1 className="mb-4 text-center font-brand text-2xl tracking-wide md:mb-8">
        Doble - Exhibitions database
      </h1>
      <Divider color="border-yellow-400" />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {exhibitions.map((exhibition, index) => (
          <ExhibitionCard exhibition={exhibition} key={exhibition.id} />
        ))}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const exhibitions = await getAllExhibitions()
  const meteoData = await getMeteoForExhibitions(exhibitions)
  const formattedData = mergeExhibitionMeteo(exhibitions, meteoData)

  return {
    props: {
      exhibitions: formattedData,
    },
    revalidate: 3600,
  }
}

export default Home
