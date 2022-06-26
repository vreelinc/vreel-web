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
          advanced {
            header
            info {
              header
              description
              collaborators
              credits
              background_audio_credit
              music_credit
            }
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
  query User($username: String!) {
    username(username: $username) {
      id
      email
      username
      companyName
      title
      profilePicture
      files {
        file_count
      }
      vreel {
        author
        logo_uri
        elements {
          socials {
            header
            socials {
              platform
              username
            }
          }
          simple_links {
            header
            links {
              id
              thumbnail
              link_header
              url
              link_type
              tag
            }
          }
          socials {
            header
            socials {
              platform
              username
            }
          }
        }
        slides {
          id
          slide_location
          content_type
          uri
          title {
            header
            description
          }
          advanced {
            header
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
