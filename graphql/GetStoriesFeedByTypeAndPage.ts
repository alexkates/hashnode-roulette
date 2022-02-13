import { gql } from "@apollo/client"

export default gql`
  query GetStoriesFeedByTypeAndPage($type: FeedType!, $page: Int) {
    storiesFeed(type: $type, page: $page) {
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
