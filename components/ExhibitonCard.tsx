import Divider from "./Divider"
import MeteoCard from "./MeteoCard"

interface Props {
  exhibition: any
}

const ExhibitionCard = ({ exhibition }: Props) => {
  return (
    <article className="rounded-xl bg-white p-4 shadow duration-200 hover:skew-x-1 hover:scale-[102%] hover:shadow-md">
      <h2 className="mb-2 font-brand text-xl tracking-wide">
        {exhibition.title}
      </h2>
      <p className="mb-4 text-gray-700">{exhibition.venues.fullname}</p>
      <a
        href={exhibition.url}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-gray-500">
        Exhibiton details
      </a>
      <div className="mt-2">
        <Divider />
        {exhibition.meteo ? (
          <>
            <h3 className="my-4 text-lg">Weather forecast</h3>
            <div className="flex flex-col">
              {exhibition.meteo.map((item: any, index: number) => (
                <MeteoCard index={index} data={item} key={item.dt} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400">No weather data</p>
        )}
      </div>
    </article>
  )
}

export default ExhibitionCard
