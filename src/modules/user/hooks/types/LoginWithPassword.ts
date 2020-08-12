/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginWithPassword
// ====================================================

export interface LoginWithPassword_login_user {
  __typename: "User";
  id: string;
}

export interface LoginWithPassword_login {
  __typename: "LoginResult";
  user: LoginWithPassword_login_user | null;
}

export interface LoginWithPassword {
  login: LoginWithPassword_login | null;
}

export interface LoginWithPasswordVariables {
  email: string;
  password: string;
}
