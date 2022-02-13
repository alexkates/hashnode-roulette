import React, { ReactNode, useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"

export default () => {
  return (
    <div className="bg-gray-900 text-gray-100">
      <Navbar />
    </div>
  )
}

const navLinks = (
  <a
    onClick={() => signOut()}
    className="no-underline cursor-pointer font-semibold hover:text-gray-300"
  >
    Sign Out
  </a>
)

const Navbar = () => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center">
      <Link href="/">
        <a className="text-xl font-bold no-underline hover:text-gray-300">
          Hashnode Roulette
        </a>
      </Link>
    </div>
    <nav className="space-x-6">{navLinks}</nav>
  </div>
)
