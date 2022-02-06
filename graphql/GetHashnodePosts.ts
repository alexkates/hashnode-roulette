import { gql } from "@apollo/client"

export default gql`
  query GetNewPosts {
    storiesFeed(type: NEW) {
      _id
      author {
        _id
        coverImage
        username
      }
      brief
      coverImage
      dateAdded
      title
    }
  }
`
