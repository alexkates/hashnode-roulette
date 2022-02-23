import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"

export default function IndexPage() {
  return (
    <section className="flex flex-col mx-auto text-center pt-32">
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
    </section>
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
