import { gql } from "@apollo/client"

export default gql`
  mutation FollowUser($userId: String!) {
    followUser(userId: $userId) {
      code
      success
      message
    }
  }
`
