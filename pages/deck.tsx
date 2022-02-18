import { DateTime } from "luxon"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import TinderCard from "react-tinder-card"
import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import router from "next/router"

import { Story } from "../models/Story"
import GetStoriesFeedByTypeAndPageQuery from "../graphql/GetStoriesFeedByTypeAndPage"
import ReactToStoryMutation from "../graphql/ReactToStory"

export default function DeckPage() {
  const [page, setPage] = useState(0)
  const [stories, setStories] = useState([])

  useEffect(() => {
    const apiKey = localStorage.getItem("HASHNODE_API_KEY")

    if (!apiKey) {
      router.push("/settings")
    }
  }, [])

  const {
    loading: storiesLoading,
    error: storiesError,
    fetchMore: fetchMoreStories,
  } = useQuery(GetStoriesFeedByTypeAndPageQuery, {
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

  const [
    ReactToStory,
    {
      data: reactToStoryData,
      loading: reactToStoryLoading,
      error: reactToStoryError,
    },
  ] = useMutation(ReactToStoryMutation)

  const filterQualityStories = (story: Story) =>
    story.coverImage && story.author?.coverImage

  useEffect(() => {
    fetchMoreStories({
      variables: {
        page,
      },
    })
  }, [page])

  if (storiesLoading) return null
  if (storiesError) return <p>Error ...</p>

  return (
    <div className="flex justify-center sm:mt-8">
      {stories.map((story: Story, index: number) => (
        <TinderCard
          key={index}
          className="absolute cursor-pointer max-w-lg rounded shadow-lg"
          onSwipe={(direction: string) => {
            if (index === 0) {
              setPage(page + 1)
            }

            if (direction === "up") {
              window.open(`https://hashnode.com/${story.slug}`, "_blank")
            }

            if (direction === "right") {
              ReactToStory({
                variables: {
                  reaction: "THUMBS_UP",
                  storyId: story._id,
                },
              })
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
