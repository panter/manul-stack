/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface BlogPostFilter {
  every?: BlogPostWhereInput | null;
  none?: BlogPostWhereInput | null;
  some?: BlogPostWhereInput | null;
}

export interface BlogPostWhereInput {
  AND?: BlogPostWhereInput[] | null;
  author?: UserWhereInput | null;
  authorId?: StringFilter | null;
  content?: NullableStringFilter | null;
  id?: UUIDFilter | null;
  NOT?: BlogPostWhereInput[] | null;
  OR?: BlogPostWhereInput[] | null;
  published?: BooleanFilter | null;
  title?: StringFilter | null;
}

export interface BooleanFilter {
  equals?: boolean | null;
  not?: boolean | null;
}

export interface CartItemFilter {
  every?: CartItemWhereInput | null;
  none?: CartItemWhereInput | null;
  some?: CartItemWhereInput | null;
}

export interface CartItemWhereInput {
  AND?: CartItemWhereInput[] | null;
  cart?: CartWhereInput | null;
  cartId?: StringFilter | null;
  id?: UUIDFilter | null;
  NOT?: CartItemWhereInput[] | null;
  OR?: CartItemWhereInput[] | null;
  product?: ProductWhereInput | null;
  productId?: StringFilter | null;
  quantity?: IntFilter | null;
}

export interface CartWhereInput {
  AND?: CartWhereInput[] | null;
  cartItems?: CartItemFilter | null;
  created?: DateTimeFilter | null;
  id?: UUIDFilter | null;
  NOT?: CartWhereInput[] | null;
  OR?: CartWhereInput[] | null;
  user?: UserWhereInput | null;
  userId?: NullableStringFilter | null;
}

export interface DateTimeFilter {
  equals?: any | null;
  gt?: any | null;
  gte?: any | null;
  in?: any[] | null;
  lt?: any | null;
  lte?: any | null;
  not?: any | null;
  notIn?: any[] | null;
}

export interface IntFilter {
  equals?: number | null;
  gt?: number | null;
  gte?: number | null;
  in?: number[] | null;
  lt?: number | null;
  lte?: number | null;
  not?: number | null;
  notIn?: number[] | null;
}

export interface NullableStringFilter {
  contains?: string | null;
  endsWith?: string | null;
  equals?: string | null;
  gt?: string | null;
  gte?: string | null;
  in?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  not?: string | null;
  notIn?: string[] | null;
  startsWith?: string | null;
}

export interface OrderFilter {
  every?: OrderWhereInput | null;
  none?: OrderWhereInput | null;
  some?: OrderWhereInput | null;
}

export interface OrderItemFilter {
  every?: OrderItemWhereInput | null;
  none?: OrderItemWhereInput | null;
  some?: OrderItemWhereInput | null;
}

export interface OrderItemWhereInput {
  AND?: OrderItemWhereInput[] | null;
  id?: UUIDFilter | null;
  NOT?: OrderItemWhereInput[] | null;
  OR?: OrderItemWhereInput[] | null;
  order?: OrderWhereInput | null;
  orderId?: StringFilter | null;
  product?: ProductWhereInput | null;
  productId?: StringFilter | null;
  quantity?: IntFilter | null;
}

export interface OrderWhereInput {
  AND?: OrderWhereInput[] | null;
  created?: DateTimeFilter | null;
  id?: UUIDFilter | null;
  NOT?: OrderWhereInput[] | null;
  OR?: OrderWhereInput[] | null;
  orderItems?: OrderItemFilter | null;
  user?: UserWhereInput | null;
  userId?: NullableStringFilter | null;
}

export interface ProductFilter {
  every?: ProductWhereInput | null;
  none?: ProductWhereInput | null;
  some?: ProductWhereInput | null;
}

export interface ProductTagFilter {
  every?: ProductTagWhereInput | null;
  none?: ProductTagWhereInput | null;
  some?: ProductTagWhereInput | null;
}

export interface ProductTagWhereInput {
  AND?: ProductTagWhereInput[] | null;
  id?: UUIDFilter | null;
  NOT?: ProductTagWhereInput[] | null;
  OR?: ProductTagWhereInput[] | null;
  products?: ProductFilter | null;
  title?: StringFilter | null;
}

export interface ProductWhereInput {
  AND?: ProductWhereInput[] | null;
  cartItems?: CartItemFilter | null;
  id?: UUIDFilter | null;
  imageUrl?: StringFilter | null;
  NOT?: ProductWhereInput[] | null;
  OR?: ProductWhereInput[] | null;
  OrderItem?: OrderItemFilter | null;
  slug?: StringFilter | null;
  tags?: ProductTagFilter | null;
  title?: StringFilter | null;
}

export interface StringFilter {
  contains?: string | null;
  endsWith?: string | null;
  equals?: string | null;
  gt?: string | null;
  gte?: string | null;
  in?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  not?: string | null;
  notIn?: string[] | null;
  startsWith?: string | null;
}

export interface UUIDFilter {
  contains?: any | null;
  endsWith?: any | null;
  equals?: any | null;
  gt?: any | null;
  gte?: any | null;
  in?: any[] | null;
  lt?: any | null;
  lte?: any | null;
  not?: any | null;
  notIn?: any[] | null;
  startsWith?: any | null;
}

export interface UserFilter {
  every?: UserWhereInput | null;
  none?: UserWhereInput | null;
  some?: UserWhereInput | null;
}

export interface UserRoleFilter {
  every?: UserRoleWhereInput | null;
  none?: UserRoleWhereInput | null;
  some?: UserRoleWhereInput | null;
}

export interface UserRoleWhereInput {
  AND?: UserRoleWhereInput[] | null;
  id?: StringFilter | null;
  NOT?: UserRoleWhereInput[] | null;
  OR?: UserRoleWhereInput[] | null;
  users?: UserFilter | null;
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | null;
  blogPosts?: BlogPostFilter | null;
  cart?: CartWhereInput | null;
  email?: StringFilter | null;
  id?: UUIDFilter | null;
  NOT?: UserWhereInput[] | null;
  OR?: UserWhereInput[] | null;
  Order?: OrderFilter | null;
  password?: StringFilter | null;
  roles?: UserRoleFilter | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
