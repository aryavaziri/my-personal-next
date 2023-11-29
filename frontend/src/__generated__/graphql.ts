/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
  _Any: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  mimetype: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProject?: Maybe<Project>;
  delProject?: Maybe<Scalars['String']['output']>;
  editProject?: Maybe<Project>;
  uploadFile: Scalars['String']['output'];
};


export type MutationAddProjectArgs = {
  extention: Scalars['String']['input'];
  project: ProjectInput;
};


export type MutationDelProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditProjectArgs = {
  extention: Scalars['String']['input'];
  project: ProjectInput;
  projectId: Scalars['ID']['input'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID']['output'];
  creator?: Maybe<Scalars['ID']['output']>;
  extention: Scalars['String']['output'];
  link: Scalars['String']['output'];
  src: Scalars['String']['output'];
  tech?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  video?: Maybe<Scalars['Boolean']['output']>;
};

export type ProjectInput = {
  link: Scalars['String']['input'];
  src?: InputMaybe<Scalars['String']['input']>;
  tech?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  video?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  projects?: Maybe<Array<Maybe<Project>>>;
  projects2?: Maybe<Array<Maybe<Project>>>;
  user?: Maybe<Array<Maybe<User>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryUserArgs = {
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profileImg?: Maybe<Scalars['String']['output']>;
};

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']['output']>;
};

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', _id: string, title: string, tech?: Array<string | null> | null, link: string, video?: boolean | null, extention: string, creator?: string | null } | null> | null };

export type DelProjectMutationVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type DelProjectMutation = { __typename?: 'Mutation', delProject?: string | null };

export type Projects2QueryVariables = Exact<{ [key: string]: never; }>;


export type Projects2Query = { __typename?: 'Query', projects2?: Array<{ __typename?: 'Project', _id: string, title: string, tech?: Array<string | null> | null, link: string, video?: boolean | null, extention: string, creator?: string | null } | null> | null };


export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tech"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"extention"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}}]}}]}}]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const DelProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DelProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}]}}]} as unknown as DocumentNode<DelProjectMutation, DelProjectMutationVariables>;
export const Projects2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projects2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tech"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"extention"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}}]}}]}}]} as unknown as DocumentNode<Projects2Query, Projects2QueryVariables>;