import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { useState } from "react"

export default function Settings() {
  const [apiKey, setApiKey] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    alert(`Your API key is: ${apiKey}`)
  }

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <label className="w-full">
        <input
          type="text"
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          placeholder="Enter your Hashnode API key"
          onChange={(e) => setApiKey(e.target.value)}
          value={apiKey}
        />
      </label>

      <span className="font-light italic block text-center">
        Hashnode Roulette never saves your API Key.
      </span>
      <input
        type="submit"
        value="Submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
      />
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
