import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $username: String!
    $account_type: String!
  ) {
    register(
      input: {
        email: $email
        password: $password
        username: $username
        account_type: $account_type
      }
    ) {
      id
      username
      email
    }
  }
`;

export const registerUser = async (username: string, email: string , password: string , accout_type: string) =>{

}

export const CREATE_SLIDE =  gql`
mutation CreateSlide($token: String!) {
    createSlide(token: $token) {
      id
      author
    }
  }

`