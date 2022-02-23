import Link from "next/link"

type NavbarMenuItemProps = {
  href: string
  children: React.ReactNode
}

export default (props: NavbarMenuItemProps) => {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a
        className="text-gray-900 flex rounded-md items-center w-full px-2 py-2 text-sm"
        {...rest}
      >
        {children}
      </a>
    </Link>
  )
}
