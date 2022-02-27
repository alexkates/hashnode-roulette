import { GetServerSideProps } from "next"
import { getSession, signIn } from "next-auth/react"

export default function IndexPage() {
  return (
    <div>
      <section className="text-center pt-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
          Make your hashnode feed{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            wonderful
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Quickly find new stories and authors to follow using simple mobile
          gestures.
        </p>
        <button
          onClick={() => signIn()}
          className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in
        </button>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: "/deck",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
