import { gql } from "@apollo/client";
export const vreel = `
vreel {
  id
  elements{
    simple_links{
      id
      parent
      header
      hidden
      position
      links{
        id
        hidden
        position
        thumbnail
        link_header
        url
        link_type
        tag
      }
    }
    videos{
      header
      hidden
      videos {
      id
      hidden
      parent
      position
      video_header
      description
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

    socials{
      socials
{
platform
}
    }
  }
  author
  logo_uri
      gallery {
        header
        position
        id
         slides {
    id
    slide_location
    active
    logo_uri
    logo_visible
    content_type
    uri
    title {
      header
      description
    }
    advanced {
      header
      logoUrl
      isDarkMode
      background_audio_source
      background_audio_url
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
  simple_links {
    id
    parent
    header
    hidden
    position
    links {
      id
      parent
      hidden
      position
      thumbnail
      link_header
      url
      link_type
    }
  }
  socials {
    id
    parent
    position
    position
    hidden
    header
    socials {
      id
      position
      platform
      username
    }
  }
  gallery{
    id
    parent
    position
    hidden
    header
    slides {
    id
    slide_location
    active
    logo_uri
    logo_visible
    content_type
    uri
    title {
      header
      description
    }
    advanced {
      header
      logoUrl
      isDarkMode
      background_audio_source
      background_audio_url
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
  embed {
    id
    header
    position
    background_color
    embed_code
  }
  video_gallery {
    id
    parent
    position
    hidden
    header
    videos {
      id
      hidden
      parent
      position
      video_header
      description
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
  slides {
    id
    slide_location
    active
    logo_uri
    logo_visible
    content_type
    uri
    title {
      header
      description
    }
    advanced {
      header
      logoUrl
      isDarkMode
      background_audio_source
      background_audio_url
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
`;
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
      companyName
      title
      profilePicture
      files {
        file_count
      }
      ${vreel}
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
      ${vreel}
    }
  }
`;

export const GET_ENTERPRISE_EMPLOYEES = gql`
    query employees($token: String!) {
    enterpriseByToken(token: $token) {
      id
      employees {
        id
        title
        profilePicture
        first_name
        last_name
        email
        # selfPortraitImage
        # selfLandscapeImage
        # account_type
        companyName
        # username
        middle_initial
        prefix
        suffix
        # linkedinUrl
        home_phone
        cell_phone
        work_phone
        business_address
        home_address
        website
        landing_page
        job_title
      }
    }
  }
`

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
        linkedinUrl
        home_phone
        cell_phone
        work_phone
        business_address
        home_address
        website
        landing_page
        job_title
      }
      ${vreel}
    }
  }
`;

export const GET_ACCOUNT_DATA = gql`
   query User($token: String!) {
    getUserByToken(token: $token) {
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
        linkedinUrl
        home_phone
        cell_phone
        work_phone
        business_address
        home_address
        website
        landing_page
        job_title
        note
      
    }
  }
`