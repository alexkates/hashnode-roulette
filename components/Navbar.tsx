import Link from "next/link"
import { useSession } from "next-auth/react"
import NavbarMenu from "./NavbarMenu"

export default () => {
  return (
    <div className="bg-gray-900 text-gray-100">
      <Navbar />
    </div>
  )
}

const Navbar = () => {
  const session = useSession()

  return (
    <div className="flex items-center justify-between p-8">
      <Link href="/">
        <a className="text-xl font-bold no-underline hover:text-gray-300">
          Hashnode Roulette
        </a>
      </Link>
      {session.status === "authenticated" ? (
        <NavbarMenu />
      ) : (
        <Link href="/api/auth/signin">
          <a className="no-underline cursor-pointer font-semibold hover:text-gray-300">
            Sign in
          </a>
        </Link>
      )}
    </div>
  )
}
