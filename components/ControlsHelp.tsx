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
      <div className="flex justify-between m-4">
        <div className="flex flex-col">
          <BanIcon className="w-12 h-12 text-red-500 hover:text-red-700" />
          <ArrowSmLeftIcon className="w-12 h-12" />
        </div>
        <div className="flex flex-col">
          <BookOpenIcon className="w-12 h-12 text-yellow-500 hover:text-yellow-700" />
          <ArrowSmUpIcon className="w-12 h-12" />
        </div>
        <div className="flex flex-col">
          <UserAddIcon className="w-12 h-12 text-green-500 hover:text-green-700" />{" "}
          <ArrowSmDownIcon className="w-12 h-12" />
        </div>

        <div className="flex flex-col">
          <ThumbUpIcon className="w-12 h-12 text-cyan-500 hover:text-cyan-700" />{" "}
          <ArrowSmRightIcon className="w-12 h-12" />
        </div>
      </div>
    </section>
  )
}
