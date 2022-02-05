export type CardProps = {
  children: React.ReactNode
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center p-4">
      {children}
    </div>
  )
}
