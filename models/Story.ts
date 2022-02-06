import { Author } from "./Author"

export interface Story {
  _id: string
  author: Author
  brief: string
  coverImage: string
  dateAdded: string
  title: string
  __typename: string
}
