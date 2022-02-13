import { DateTime } from "luxon"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import TinderCard from "react-tinder-card"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"

import GetStoriesFeedByTypeAndPage from "../graphql/GetStoriesFeedByTypeAndPage"
import { Story } from "../models/Story"

export default function DeckPage() {
  const [page, setPage] = useState(0)
  const [stories, setStories] = useState([])

  const { loading, error, fetchMore } = useQuery(GetStoriesFeedByTypeAndPage, {
    variables: {
      type: "NEW",
      page,
    },
    onCompleted: (data) => {
      const qualityStories = data.storiesFeed.filter(filterQualityStories)
      if (qualityStories.length > 0) {
        setStories(qualityStories)
      } else {
        setPage(page + 1)
      }
    },
  })

  const filterQualityStories = (story: Story) =>
    story.coverImage && story.author?.coverImage

  useEffect(() => {
    fetchMore({
      variables: {
        page,
      },
    })
  }, [page])

  if (loading) return null
  if (error) return <p>Error ...</p>

  return (
    <div className="flex justify-center h-screen items-center">
      {stories.map((story: Story, index: number) => (
        <TinderCard
          key={index}
          className="absolute cursor-pointer max-w-lg rounded shadow-lg"
          onSwipe={(direction: string) => {
            if (index === 0) {
              setPage(page + 1)
            }
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <img className="w-full h-80" src={story.coverImage} />
            <div className="border-gray-400 bg-white rounded-b p-6 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="text-gray-900 font-bold text-2xl mb-2">
                  {story.title}
                </div>
                <p className="text-gray-700 text-base text-ellipsis">
                  {story.brief}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-2"
                  src={story.author?.coverImage}
                />
                <div className="text-md">
                  <p className="text-gray-900">{story.author.username}</p>
                  <p className="text-gray-600">
                    {DateTime.fromISO(story.dateAdded).toFormat("LLL dd, yyyy")}
                  </p>
                </div>
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
