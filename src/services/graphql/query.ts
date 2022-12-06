import { gql } from "@apollo/client";
export const vreel = `
vreel {
  id
  members {
    header
    hidden
    id
    parent
    position
    slides {
      company_name
      is_employee
      profile_picture
      author
      contact_visible
      content_type
      cta1 {
        link_type
        link_header
        link_url
        owner_id
      }
      advanced {
        background_audio_source
        background_audio_url
        header

        isDarkMode
        link_type
        logoUrl
      }
      cta2 {
        link_header
        link_url
        owner_id
        link_type
      }
      cta3 {
        link_header
        link_url
        owner_id
        link_type
      }
      cta4 {
        link_header
        link_type
        link_url
        owner_id
      }
      desktop {
        background_audio_uri
        content_type
        start_time
        stop_time
        uri
      }
      id
      logo_desktop
      logo_mobile
      logo_uri
      logo_visible
      metadata {
        created
        size
      }
      mobile {
        start_time
        content_type
        background_audio_uri
        stop_time
        uri
      }
      muted
      parent
      qrcode_visible
      slide_location
      share_visible
      title {
        description
        header
      }
      uri
    }
  }
  display_options {
    audio_type
    background_audio
    default_logo
    sections {
      header {
        uri
        family
      }
      button {
        uri
        family
      }
      title{
        family
        uri
      }
      description {
        uri 
        family
      }
    }
    slide {
      description {
        family
        uri
      }
      title {
        uri
        family
      }
      button {
        family
        uri
      }
    }
  
  }
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
    background_color
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
    background_color
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
    muted
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
    muted
    slide_location
    active
    logo_uri
    logo_visible
    contact_visible
    qrcode_visible
    share_visible
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
    cta3 {
      link_header
      link_type
      link_url
    }
    cta4 {
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
  query User($token: String!, $metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata ) {
      id
      email
      username
      companyName
      title
      profilePicture
      v_email
      prefix
      suffix
      files {
        file_count
      }
      ${vreel}
    }
  }
`;

export const GET_USER_BY_USER_NAME = gql`
  query User($username: String!, $metadata: DetailedRequest!) {
    username(username: $username, metadata: $metadata) {
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
      default_portrait
      default_landscape
      employees {
        id
        title
        profilePicture
        v_email
        first_name
        last_name
        email
        pagesRef
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
        employee_metadata {
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
          cta3 {
            link_header
            link_url
            link_type
          }
          cta4 {
            link_header
            link_type
            link_url
          }
          display_profile_image
          description
          job_description
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
      companyName
      default_landscape
      default_portrait
      employee {
        employee_metadata {
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
          cta3 {
            link_header
            link_url
            link_type
          }
          cta4 {
            link_header
            link_type
            link_url
          }
          display_profile_image
          description
          job_description
        }
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
      ${vreel}
    }
  }
`;

export const GET_ACCOUNT_DATA = gql`
  query User($token: String!, $metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      id
      title
      profilePicture
      first_name
      last_name
      email
      v_email
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
`;

export const GET_DISPLAY_OPTIONS = gql`
  query displayOption($token: String!,$metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      id
      vreel {
        display_options {
          background_audio
          default_logo
          audio_type
        }
      }
    }
  }
`;

export const GET_DISPLAY_OPTIONS_BY_PAGE = gql`
  query page($id: String!, $presentation: Boolean!) {
    page(id: $id, presentation: $presentation) {
      display_options {
        audio_type
        background_audio
        default_logo
        sections {
          header {
            uri
            family
          }
          button {
            uri
            family
          }
          title {
            family
            uri
          }
          description {
            uri
            family
          }
        }
        slide {
          description {
            family
            uri
          }
          title {
            uri
            family
          }
          button {
            family
            uri
          }
        }
      }
    }
  }
`;

export const GET_PAGES_BY_TOKEN = gql`
  query displayOption($token: String!,$metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata ) {
      id
      pages {
        id
      }
    }
  }
`;

export const GET_PAGE = gql`
  query page($id: String!, $presentation: Boolean!) {
    page(id: $id, presentation: $presentation) {
      id
      members {
      header
      hidden
      id
      parent
      position
      slides {
          is_employee
        profile_picture
        company_name
        author
        contact_visible
        is_employee
        profile_picture
        # job_description
        content_type
        cta1 {
          link_type
          link_header
          link_url
          owner_id
        }
        advanced {
          background_audio_source
          background_audio_url
          header

          isDarkMode
          link_type
          logoUrl
        }
        cta2 {
          link_header
          link_url
          owner_id
          link_type
        }
        cta3 {
          link_header
          link_url
          owner_id
          link_type
        }
        cta4 {
          link_header
          link_type
          link_url
          owner_id
        }
        desktop {
          background_audio_uri
          content_type
          start_time
          stop_time
          uri
        }
        id
        logo_desktop
        logo_mobile
        logo_uri
        logo_visible
        metadata {
          created
          size
        }
        mobile {
          start_time
          content_type
          background_audio_uri
          stop_time
          uri
        }
        muted
        parent
        qrcode_visible
        slide_location
        share_visible
        title {
          description
          header
        }
        uri
      }
    }
      display_options {
        audio_type
        background_audio
        default_logo
        sections {
          header {
            uri
            family
          }
          button {
            uri
            family
          }
          title {
            family
            uri
          }
          description {
            uri
            family
          }
        }
        slide {
          description {
            family
            uri
          }
          title {
            uri
            family
          }
          button {
            family
            uri
          }
        }
      }
      elements {
        simple_links {
          id
          parent
          header
          hidden
          position
          links {
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
        videos {
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

        socials {
          background_color

          socials {
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
        background_color

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
      gallery {
        id
        parent
        position
        hidden
        header
        slides {
          id
          slide_location
          muted
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
        muted
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
        cta3 {
          link_header
          link_type
          link_url
        }
        cta4 {
          link_header
          link_type
          link_url
        }
        contact_visible
    qrcode_visible
    share_visible
      }
    }
  }
`;

export const GET_USER_PAGES = gql`
  query pages($token: String!,$metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      id
      pages {
        id
      }
    }
  }
`;


export const GET_EMPLOYEES_PREVIEW = gql`
query enterprise($token: String!) {
  enterpriseByToken(token : $token) {
    employees {
      id
      first_name
      last_name
    }
  }
  }
`