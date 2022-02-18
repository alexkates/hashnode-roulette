import { gql } from "@apollo/client"

export default gql`
  mutation ReactToStory($reaction: ReactionName!, $storyId: String!) {
    reactToStory(input: { reaction: $reaction, postId: $storyId }) {
      code
      success
      message
    }
  }
`
