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
import FollowUserMutation from "../graphql/FollowerUser"
import Loading from "../components/Loading"
import {
  BanIcon,
  ArrowSmLeftIcon,
  BookOpenIcon,
  ArrowSmUpIcon,
  UserAddIcon,
  ArrowSmDownIcon,
  ThumbUpIcon,
  ArrowSmRightIcon,
} from "@heroicons/react/solid"

const getRandomPage = () => Math.floor(Math.random() * 15)

export default function DeckPage() {
  const [page, setPage] = useState(() => getRandomPage())
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    const apiKey = localStorage.getItem("HASHNODE_API_KEY")

    if (!apiKey) {
      router.push("/settings")
    }
  }, [])

  const { loading: storiesLoading, fetchMore: fetchMoreStories } = useQuery(
    GetStoriesFeedByTypeAndPageQuery,
    {
      variables: {
        type: "BEST",
        page,
      },
      onCompleted: (data) => {
        const qualityStories: Story[] =
          data.storiesFeed.filter(filterQualityStories)
        if (qualityStories.length > 0) {
          setStories(qualityStories)
        } else {
          setPage(getRandomPage())
        }
      },
    }
  )

  const [ReactToStory] = useMutation(ReactToStoryMutation)
  const [FollowUser] = useMutation(FollowUserMutation)

  const filterQualityStories = (story: Story) =>
    story.coverImage && story.author?.coverImage

  useEffect(() => {
    fetchMoreStories({
      variables: {
        page,
      },
    })
  }, [page])

  if (storiesLoading) return <Loading />

  return (
    <div className="flex justify-center sm:mt-8">
      {stories.map((story: Story, index: number) => (
        <TinderCard
          swipeThreshold={0.1}
          flickOnSwipe={true}
          key={index}
          className="absolute cursor-pointer max-w-2xl rounded shadow-lg"
          onSwipe={handleCardSwipe(index, story)}
        >
          <div className="flex flex-col">
            <img className="w-full h-72" src={story.coverImage} />
            <div className="border-gray-400 bg-white rounded-b p-6">
              <div className="mb-4">
                <p className="text-gray-900 font-bold mb-2">{story.title}</p>
                <p className="text-gray-800">{story.brief.slice(0, 200)}...</p>
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
      <section className="container mx-auto fixed inset-x-0 bottom-0">
        <div className="flex justify-center m-4 w-auto">
          <div className="flex flex-col px-4">
            <BanIcon className="w-12 h-12 text-red-500" />
            <ArrowSmLeftIcon className="w-12 h-12" />
          </div>
          <div className="flex flex-col px-4">
            <BookOpenIcon className="w-12 h-12 text-yellow-500" />
            <ArrowSmUpIcon className="w-12 h-12" />
          </div>
          <div className="flex flex-col px-4">
            <UserAddIcon className="w-12 h-12 text-green-500" />
            <ArrowSmDownIcon className="w-12 h-12" />
          </div>
          <div className="flex flex-col px-4">
            <ThumbUpIcon className="w-12 h-12 text-cyan-500" />
            <ArrowSmRightIcon className="w-12 h-12" />
          </div>
        </div>
      </section>
    </div>
  )

  function handleCardSwipe(
    index: number,
    story: Story
  ): ((direction: "up" | "right" | "left" | "down") => void) | undefined {
    return (direction: string) => {
      if (index === 0) {
        setPage(getRandomPage())
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

      if (direction === "down") {
        FollowUser({
          variables: {
            userId: story.author._id,
          },
        })
      }
    }
  }
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
