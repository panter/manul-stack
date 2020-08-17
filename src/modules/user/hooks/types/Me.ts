/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_roles {
  __typename: "UserRole";
  id: string;
}

export interface Me_me {
  __typename: "User";
  id: string;
  roles: Me_me_roles[];
}

export interface Me {
  me: Me_me | null;
}
