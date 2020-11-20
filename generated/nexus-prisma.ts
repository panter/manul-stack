import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  take?: boolean
  skip?: boolean
  cursor?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  BlogPost: Prisma.BlogPost
  UserRole: Prisma.UserRole
  User: Prisma.User
  Page: Prisma.Page
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    blogPosts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'content' | 'author' | 'authorId' | 'published'
      ordering: 'id' | 'title' | 'content' | 'authorId' | 'published'
    }
    userRoles: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'users'
      ordering: 'id'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'password' | 'blogPosts' | 'roles'
      ordering: 'id' | 'email' | 'password'
    }
    pages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'published' | 'createdAt' | 'path' | 'slug' | 'sortKey' | 'parentPageId' | 'parentPage' | 'childPages' | 'navigationTitle_en' | 'navigationTitle_de' | 'htmlTitle_en' | 'htmlTitle_de' | 'content' | 'meta_description_en' | 'meta_description_de' | 'social_description_en' | 'social_description_de' | 'social_title_en' | 'social_title_de'
      ordering: 'id' | 'published' | 'createdAt' | 'path' | 'slug' | 'sortKey' | 'parentPageId' | 'navigationTitle_en' | 'navigationTitle_de' | 'htmlTitle_en' | 'htmlTitle_de' | 'content' | 'meta_description_en' | 'meta_description_de' | 'social_description_en' | 'social_description_de' | 'social_title_en' | 'social_title_de'
    }
  },
  BlogPost: {

  }
  UserRole: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'password' | 'blogPosts' | 'roles'
      ordering: 'id' | 'email' | 'password'
    }
  }
  User: {
    blogPosts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'content' | 'author' | 'authorId' | 'published'
      ordering: 'id' | 'title' | 'content' | 'authorId' | 'published'
    }
    roles: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'users'
      ordering: 'id'
    }
  }
  Page: {
    childPages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'published' | 'createdAt' | 'path' | 'slug' | 'sortKey' | 'parentPageId' | 'parentPage' | 'childPages' | 'navigationTitle_en' | 'navigationTitle_de' | 'htmlTitle_en' | 'htmlTitle_de' | 'content' | 'meta_description_en' | 'meta_description_de' | 'social_description_en' | 'social_description_de' | 'social_title_en' | 'social_title_de'
      ordering: 'id' | 'published' | 'createdAt' | 'path' | 'slug' | 'sortKey' | 'parentPageId' | 'navigationTitle_en' | 'navigationTitle_de' | 'htmlTitle_en' | 'htmlTitle_de' | 'content' | 'meta_description_en' | 'meta_description_de' | 'social_description_en' | 'social_description_de' | 'social_title_en' | 'social_title_de'
    }
  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    blogPost: 'BlogPost'
    blogPosts: 'BlogPost'
    userRole: 'UserRole'
    userRoles: 'UserRole'
    user: 'User'
    users: 'User'
    page: 'Page'
    pages: 'Page'
  },
  Mutation: {
    createOneBlogPost: 'BlogPost'
    updateOneBlogPost: 'BlogPost'
    updateManyBlogPost: 'BatchPayload'
    deleteOneBlogPost: 'BlogPost'
    deleteManyBlogPost: 'BatchPayload'
    upsertOneBlogPost: 'BlogPost'
    createOneUserRole: 'UserRole'
    updateOneUserRole: 'UserRole'
    updateManyUserRole: 'BatchPayload'
    deleteOneUserRole: 'UserRole'
    deleteManyUserRole: 'BatchPayload'
    upsertOneUserRole: 'UserRole'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOnePage: 'Page'
    updateOnePage: 'Page'
    updateManyPage: 'BatchPayload'
    deleteOnePage: 'Page'
    deleteManyPage: 'BatchPayload'
    upsertOnePage: 'Page'
  },
  BlogPost: {
    id: 'String'
    title: 'String'
    content: 'String'
    author: 'User'
    authorId: 'String'
    published: 'Boolean'
  }
  UserRole: {
    id: 'String'
    users: 'User'
  }
  User: {
    id: 'String'
    email: 'String'
    password: 'String'
    blogPosts: 'BlogPost'
    roles: 'UserRole'
  }
  Page: {
    id: 'String'
    published: 'Boolean'
    createdAt: 'DateTime'
    path: 'String'
    slug: 'String'
    sortKey: 'Int'
    parentPageId: 'String'
    parentPage: 'Page'
    childPages: 'Page'
    navigationTitle_en: 'String'
    navigationTitle_de: 'String'
    htmlTitle_en: 'String'
    htmlTitle_de: 'String'
    content: 'String'
    meta_description_en: 'String'
    meta_description_de: 'String'
    social_description_en: 'String'
    social_description_de: 'String'
    social_title_en: 'String'
    social_title_de: 'String'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  BlogPost: Typegen.NexusPrismaFields<'BlogPost'>
  UserRole: Typegen.NexusPrismaFields<'UserRole'>
  User: Typegen.NexusPrismaFields<'User'>
  Page: Typegen.NexusPrismaFields<'Page'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  