import Image from "next/image"

interface Props {
  index: number
  data: any
}

const MeteoCard = ({ index, data }: Props) => {
  const now = new Date()
  const date = new Date(data.dt * 1000)
  const diffDays = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  const displayValue =
    diffDays > 2 ? "Overmorrow" : diffDays > 1 ? "Tomorrow" : "Today"

  return (
    <div
      className={`grid grid-cols-3 items-center px-2 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-wite"
      }`}>
      <p className="text-sm">{displayValue}</p>
      <div className="text-center">
        <Image
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
          height={48}
          width={48}
        />
      </div>
      <p className="text-end text-sm">
        {Math.floor(data.temp.min)}°C - {Math.ceil(data.temp.max)}°C
      </p>
    </div>
  )
}

export default MeteoCard
