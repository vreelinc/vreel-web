import { gql } from "@apollo/client";

// Simple Links
export const CREATE_SLINK_SECTION = gql`
  mutation createSimpleLink($token: String!, $vreelId: String!) {
    createSimpleLinkElement(token: $token, vreelId: $vreelId) {
      succeeded
      message
    }
  }
`;
