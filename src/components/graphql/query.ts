import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const GET_USER_BY_TOKEN = gql`
  query User($token: String!) {
    getUserByToken(token: $token) {
      id
      email
      username
      vreel {
        author
        slides {
          id
          slide_location
          content_type
          uri
          title {
            header
            description
          }
          mobile {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          desktop {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          cta1 {
            link_header
            link_type
            link_url
          }
          cta2 {
            link_header
            link_type
            link_url
          }
        }
      }
    }
  }
`;
export const GET_USER_BY_USER_NAME = gql`
  query User($Username: String) {
    username(username: $Username) {
      id
      email
      username

      vreel {
        author
        elements {
          simple_links {
            header
            links {
              id
              thumbnail
              link_header
              url
              link_type
              link_type
              tag
            }
          }
          videos {
            header
            position
            videos {
              id
              cta1 {
                link_header
                link_type
                link_url
              }
              desktop {
                background_audio_uri
                content_type
                uri
              }
            }
          }
        }
        slides {
          id
          author
          content_type
          uri
          slide_location

          metadata {
            created
            size
          }
          title {
            header
            description
          }
          desktop {
            uri
            content_type
          }
          mobile {
            uri
          }
          cta1 {
            link_header
            link_type
            link_url
          }
        }
      }
    }
  }
`;
