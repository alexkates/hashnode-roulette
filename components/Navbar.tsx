import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

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
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <Link href="/">
          <a className="text-xl font-bold no-underline hover:text-gray-300">
            Hashnode Roulette
          </a>
        </Link>
      </div>
      <nav className="space-x-6">
        {session.status === "authenticated" ? (
          <>
            <span className="text-gray-300">
              Welcome, {session.data.user?.name}
            </span>
            <a
              onClick={() => signOut()}
              className="no-underline cursor-pointer font-semibold hover:text-gray-300"
            >
              Sign Out
            </a>
          </>
        ) : (
          <a
            onClick={() => signIn("twitter", { callbackUrl: "/deck" })}
            className="no-underline cursor-pointer font-semibold hover:text-gray-300"
          >
            Sign in w/ Twitter
          </a>
        )}
      </nav>
    </div>
  )
}
