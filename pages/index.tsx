import { GetServerSideProps } from "next"
import { Session } from "next-auth"
import { signOut, signIn } from "next-auth/react"
import { getSession } from "next-auth/react"
import { Card } from "../components/Card"

type IndexPageProps = {
  session: Session | null
}

export default function IndexPage({ session }: IndexPageProps) {
  return (
    <div className="flex justify-center h-screen items-center">
      {session ? (
        <Card>
          <h5 className="text-gray-900 text-2xl font-medium mb-4">
            Hashnode Roulette
          </h5>

          <button
            type="button"
            onClick={() => signOut()}
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Sign out
          </button>
        </Card>
      ) : (
        <Card>
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            Hashnode Roulette
          </h5>
          <button
            type="button"
            onClick={() => signIn("twitter")}
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Sign in with Twitter
          </button>
        </Card>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
