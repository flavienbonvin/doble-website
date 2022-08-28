import Link from "next/link"
import { EXTERNAL_ROUTE_GIT, ROUTE_HOME } from "../constants/routes"

const Nav = () => {
  return (
    <nav className="mb-10 flex h-14 place-items-center justify-between px-10 shadow-sm">
      <Link href={ROUTE_HOME}>
        <span className="font-brand text-2xl tracking-wide">
          Doble <span className="tracking-normal text-yellow-400">Art</span>
        </span>
      </Link>
      <a
        href={EXTERNAL_ROUTE_GIT}
        target="_blank"
        rel="noreferrer"
        className="text-yellow-400 hover:font-semibold hover:text-yellow-500 hover:decoration-yellow-500">
        Github
      </a>
    </nav>
  )
}

export default Nav
