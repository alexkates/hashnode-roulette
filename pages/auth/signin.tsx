import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <>
      <button onClick={() => signIn("twitter")}>Sign in with Twitter</button>
    </>
  )
}
