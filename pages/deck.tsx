import { useQuery } from "@apollo/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import GetHashnodePosts from "../graphql/GetHashnodePosts"
import { Story } from "../models/Story"
import TinderCard from "react-tinder-card"
import { DateTime } from "luxon"

export default function DeckPage() {
  const { loading, error, data } = useQuery(GetHashnodePosts)

  if (loading) return null
  if (error) return <p>Error ...</p>
  return (
    <div className="flex justify-center h-screen items-center">
      {data.storiesFeed
        .filter((story: Story) => story.coverImage)
        .filter((story: Story) => story.author?.coverImage)
        .map((story: Story, index: number) => (
          <TinderCard
            key={index}
            className="absolute cursor-pointer max-w-md h-fit rounded overflow-hidden shadow-lg"
          >
            <img src={story.coverImage} className="w-full h-48" />
            <div className="border-gray-400 bg-white rounded-b p-6 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {story.title}
                </div>
                <p className="text-gray-700 text-base">{story.brief}</p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={story.author?.coverImage}
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">
                    {story.author.username}
                  </p>
                  <p className="text-gray-600">
                    {DateTime.fromISO(story.dateAdded).toFormat("LLL dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
    </div>
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
