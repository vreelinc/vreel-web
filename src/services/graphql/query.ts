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
          simple_links {
            header
            position
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
            position
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

export const GET_ENTERPRISE_EMPLOYEE = gql`
  query enterprise($enterpriseName: String!, $employeeId: String!) {
    enterpiseEmployee(
      enterpriseName: $enterpriseName
      employeeId: $employeeId
    ) {
      employee {
        id
        title
        profilePicture
        first_name
        last_name
        email
        selfPortraitImage
        selfLandscapeImage
        account_type
        companyName
        username
        middle_initial
        prefix
        suffix
        home_phone
        cell_phone
        work_phone
        business_address
        home_address
        website
        landing_page
        job_title
      }
      vreel {
        logo_uri
        author
        elements {
          socials {
            header
            position
            socials {
              platform
              username
            }
          }
          simple_links {
            header
            position
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
          author
          metadata {
            created
            size
          }
          uri
          title {
            header
            description
          }
          advanced {
            header
            background_audio_url
            background_audio_source

            isDarkMode
            link_type
            logoUrl
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
