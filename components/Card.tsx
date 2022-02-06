export type CardProps = {
  children: React.ReactNode
}

export default ({ children }: CardProps) => {
  return (
    <div className="block rounded-lg shadow-lg bg-white max-w-full text-center p-4">
      {children}
    </div>
  )
}
