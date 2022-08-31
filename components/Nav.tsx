import Link from "next/link"
import {
  EXTERNAL_ROUTE_GIT,
  ROUTE_ABOUT,
  ROUTE_HOME,
} from "../constants/routes"

const Nav = () => {
  return (
    <nav className="mb-10 flex h-14 place-items-center justify-between px-10 shadow-sm">
      <Link href={ROUTE_HOME}>
        <span className="cursor-pointer font-brand text-2xl tracking-wide">
          Doble <span className="tracking-normal text-yellow-500">Art</span>
        </span>
      </Link>
      <div className="flex gap-4">
        <Link href={ROUTE_ABOUT}>About</Link>
        <a
          href={EXTERNAL_ROUTE_GIT}
          target="_blank"
          rel="noreferrer"
          className="text-yellow-500 decoration-yellow-500 decoration-2 hover:underline">
          Github
        </a>
      </div>
    </nav>
  )
}

export default Nav
