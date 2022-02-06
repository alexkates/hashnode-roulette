import { GetServerSideProps } from "next"
import { Session } from "next-auth"
import { signOut, signIn } from "next-auth/react"
import { getSession } from "next-auth/react"
import { Button } from "../components/Button"
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
          <Button onClick={() => signOut()} text="Sign out" />
        </Card>
      ) : (
        <Card>
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            Hashnode Roulette
          </h5>
          <Button
            onClick={() => signIn("twitter")}
            text="Sign in with Twitter"
          />
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
