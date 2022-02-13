import { Author } from "./Author"

export interface Story {
  _id: string
  author: Author
  brief: string
  coverImage: string
  dateAdded: string
  slug: string
  title: string
  __typename: string
}
