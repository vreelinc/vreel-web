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

export const SET_EMPLOYEES_MEMBERS_ELEMENT = gql`
  mutation SetEmployeesInMembersElement($token: String!, $employee: [String!]!, $sectionId: String!) {
    setEmployeesInMembersElement(token: $token, employee: $employee, sectionId: $sectionId) {
      message
      succeeded
    }
  }
`


export const DELETE_MEMBERS_ELEMENT = gql`
  mutation DeleteMembersElement($token: String!, $id: String!) {
  deleteMembersElement(token: $token, id: $id) {
    succeeded
    message
  }
}
`

export const REMOVE_EMPLOYEES_FROM_MEMBERS_ELEMENT = gql`
  mutation RemoveEmployeesFromMembersElement($token: String!, $employee: [String!]!, $sectionId: String!) {
  removeEmployeesFromMembersElement(token: $token, employee: $employee, sectionId: $sectionId) {
    message
    succeeded
  }
}
`


export const registerUser = async (username: string, email: string, password: string, accout_type: string) => {

}

export const CREATE_MEMBERS_ELEMENT = gql`
  mutation CreateMembersElement($token: String!, $vreelId: String) {
    createMembersElement(token: $token, vreelId: $vreelId) {
      message
      succeeded
    }
  }
`

export const CREATE_SLIDE = gql`
mutation CreateSlide($token: String!, $vreelId: String) {
    createSlide(token: $token, vreelId: $vreelId) {
      id
      author
    }
  }

`

export const UPDATE_USER = gql`
  mutation updateUser($token: String!,$fields: [VreelFields!] ) {
    updateUser(token: $token, fields: $fields){
  message
  succeeded
}
  }
`

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($token: String!,$employee: String!, $fields: [VreelFields!] ) {
    updateEmployee(token: $token, fields: $fields, employee: $employee){
      message
      succeeded
}
  }
`

export const ADD_EMPLOYEE_TO_ENTERPRISE = gql`
  mutation addEmployee($token: String!, $input: NewUser! ) {
    addEmployeeToEnterprise(token: $token, newUser: $input) {
      id
    }
  }
`

export const REMOVE_EMPLOYEE_FROM_ENTERPRISE = gql`
  mutation removeEmployee($token: String!, $employee: String!) {
    removeEmployeeFromEnterprise(token: $token, employee: $employee ) {
      message
      succeeded
    }
  }
`

export const UPDATE_VREEL_FIELDS = gql`
  mutation updateVreelFields($token: String!, $fields: [VreelFields!]!, $vreelId: String) {
    updateVreelFields(token: $token, fields: $fields, vreelId: $vreelId) {
      message 
      succeeded
    }
  }
`

export const CREATE_PAGE = gql`
  mutation addPage($token: String!) {
    addPage(token: $token) {
      message
      succeeded
    }
  }
`

export const UPDATE_ELEMENT_BACKGROUND_COLOR = gql`
  mutation editBackgroundColor($token: String!, $elementId: String!, $elementType: String!, $backgroundColor: String!) {
	editElementBackgroundColor(token: $token
  	elementId: $elementId,
    elementType:$elementType
    backgroundColor: $backgroundColor
  )  {
    succeeded
    message
  }
}
`

export const UPDATE_ENTERPRISE_MUTATION = gql`
mutation UpdateEnterprise($token: String!, $input: EnterpriseInput!) {
  updateEnterprise(token: $token, input: $input) {
    message
    succeeded
  }
}
`
export const UPDATE_EMPLOYEE_METATDATA = gql` 
  mutation UpdateEmployeeMetadata($token: String!, $input: EmployeeMetadataInput, $employeeId: String!) {
  updateEmployeeMetadata(token: $token, input: $input, employeeId: $employeeId) {
    message
    succeeded
  }
}
`
export const SET_SECTION_VISIBILITY = gql`
  mutation SetSectionVisibility($token: String!, $hidden: Boolean!, $sectionId: String!, $sectionType: String!) {
    setSectionVisibility(token: $token, hidden: $hidden, sectionId: $sectionId, sectionType: $sectionType) {
      message
      succeeded
    }
  }
`