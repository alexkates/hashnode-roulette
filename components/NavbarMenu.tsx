import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useSession } from "next-auth/react"
import NavbarMenuItem from "./NavbarMenuItem"
export default function NavbarMenu() {
  const session = useSession()

  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <img
            className="w-8 h-8 rounded-full"
            src={session.data?.user?.image as string}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              <NavbarMenuItem href="/settings">
                <a
                  className={
                    "text-gray-900 flex rounded-md items-center w-full px-2 py-2 text-sm"
                  }
                >
                  Settings
                </a>
              </NavbarMenuItem>
            </Menu.Item>
            <Menu.Item>
              <NavbarMenuItem href="/api/auth/signout">
                <a
                  className={
                    "text-gray-900 flex rounded-md items-center w-full px-2 py-2 text-sm"
                  }
                >
                  Sign out
                </a>
              </NavbarMenuItem>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
