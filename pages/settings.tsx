import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BanIcon } from "@heroicons/react/solid"

export default function Settings() {
  const [apiKey, setApiKey] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (apiKey) {
      localStorage.setItem("HASHNODE_API_KEY", apiKey)
      router.push("/")
    }
  }

  const handleRemoveApiKeyClick = () => {
    localStorage.removeItem("HASHNODE_API_KEY")
    setApiKey("")
    router.push("/")
  }

  useEffect(() => {
    const apiKey = localStorage.getItem("HASHNODE_API_KEY")
    if (apiKey) {
      setApiKey(apiKey)
    }
  }, [])

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="flex items-center">
        <BanIcon
          onClick={() => handleRemoveApiKeyClick()}
          className="w-8 h-8 mr-2 cursor-pointer"
        />
        <input
          type="text"
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          placeholder="Enter your Hashnode API key"
          onChange={(e) => setApiKey(e.target.value)}
          value={apiKey}
        />
      </div>

      <div className="flex items-center mt-2">
        <p className="font-light italic block">
          Hashnode Roulette never saves your API Key.
        </p>
      </div>
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
