import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"

export default function IndexPage() {
  return (
    <div>
      <h1>Hello Next.js 👋</h1>
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
