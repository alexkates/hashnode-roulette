import Link from "next/link"

type NavbarMenuItemProps = {
  href: string
  children: React.ReactNode
}

export default (props: NavbarMenuItemProps) => {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}
