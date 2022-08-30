import { gql } from "@apollo/client";
import { vreel } from "@graphql/query";

// Simple Links
export const CREATE_SLINK_SECTION = gql`
  mutation createSimpleLink($token: String!, $vreelId: String!) {
    createSimpleLinkElement(token: $token, vreelId: $vreelId) {
      succeeded
      message
    }
  }
`;

export const GET_SECTIONS = gql`
  query User($token: String!) {
    getUserByToken(token: $token) {
      ${vreel}
    }
  }
`;

export const APPEND_LINK = gql`
  mutation appendSimpleLink(
    $token: String!
    $elementId: String!
    $link: SimpleLinkInput!
  ) {
    appendSimpleLink(token: $token, elementId: $elementId, link: $link) {
      succeeded
      message
    }
  }
`;
export const REMOVE_SLIDE = gql`
  mutation deleteSlide($token: String!, $slideId: String!) {
    removeSlide(token: $token, slideId: $slideId) {
      succeeded
      message
    }
  }
`;
