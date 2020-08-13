import gql from "graphql-tag";

export const LOGIN_WITH_PASSWORD_MUTATION = gql`
  mutation LoginWithPassword($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
    }
  }
`;
