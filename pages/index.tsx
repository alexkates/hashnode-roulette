import { GetServerSideProps } from "next"
import { Session } from "next-auth"
import { signOut, signIn } from "next-auth/react"
import { getSession } from "next-auth/react"
import Button from "../components/Button"
import Card from "../components/Card"

export default function IndexPage() {
  return (
    <div className="flex justify-center h-screen items-center">
      <Card>
        <h5 className="text-gray-900 text-xl font-medium mb-2">
          Hashnode Roulette
        </h5>
        <Button
          onClick={() => signIn("twitter", { callbackUrl: "/deck" })}
          text="Sign in with Twitter"
        />
      </Card>
      )
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
