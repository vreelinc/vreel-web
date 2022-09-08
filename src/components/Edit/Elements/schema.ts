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

export const EDIT_SIMPLE_LINK = gql`
  mutation editSimpleLink(
    $token: String!
    $elementId: String!
    $input: SimpleLinkInput!
  ) {
    editSimpleLinkElementLink(token: $token, elementId: $elementId, input: $input) {
      succeeded
      message
    }
  }
`
export const CREATE_SOCIALS_ELEMENT = gql`
  mutation createSocialsElement($token: String!, $vreelId: String) {
    createSocialsElement(token: $token, vreelId: $vreelId) {
      succeeded
      message
    }
  }
`
export const CREATE_SOCIALS_LINK = gql`
    mutation editSimpleLink(
    $token: String!
    $elementId: String!
    $link: SocialsInput!
  ) {
    appendSocialsLink(token: $token, elementId: $elementId, link: $link) {
      succeeded
      message
    }
  }
`