import {
  ThumbUpIcon,
  BanIcon,
  UserAddIcon,
  BookOpenIcon,
  ArrowSmUpIcon,
  ArrowSmLeftIcon,
  ArrowSmDownIcon,
  ArrowSmRightIcon,
} from "@heroicons/react/solid"

export default () => {
  return (
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
  )
}
