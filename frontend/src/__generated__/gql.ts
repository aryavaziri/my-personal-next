/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query projects {\n    projects {\n      _id\n      title\n      tech\n      link\n      video\n      extention\n      creator\n    }\n  }\n": types.ProjectsDocument,
    "\n  mutation AddProject($project: ProjectInput!, $extention: String!) {\n    addProject(project: $project, extention: $extention) {\n      _id\n    }\n  }\n": types.AddProjectDocument,
    "\n  mutation EditProject($project: ProjectInput!, $extention: String!, $Id: ID!) {\n    editProject(project: $project, extention: $extention, projectId: $Id) {\n      _id\n    }\n  }\n": types.EditProjectDocument,
    "\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file)\n  }\n": types.UploadFileDocument,
    "\nmutation DelProject($projectId: ID!) {\n  delProject(id:$projectId)\n}": types.DelProjectDocument,
    "\n  query projects2 {\n    projects2 {\n      _id\n      title\n      tech\n      link\n      video\n      extention\n      creator\n    }\n  }\n": types.Projects2Document,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query projects {\n    projects {\n      _id\n      title\n      tech\n      link\n      video\n      extention\n      creator\n    }\n  }\n"): (typeof documents)["\n  query projects {\n    projects {\n      _id\n      title\n      tech\n      link\n      video\n      extention\n      creator\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddProject($project: ProjectInput!, $extention: String!) {\n    addProject(project: $project, extention: $extention) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation AddProject($project: ProjectInput!, $extention: String!) {\n    addProject(project: $project, extention: $extention) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditProject($project: ProjectInput!, $extention: String!, $Id: ID!) {\n    editProject(project: $project, extention: $extention, projectId: $Id) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation EditProject($project: ProjectInput!, $extention: String!, $Id: ID!) {\n    editProject(project: $project, extention: $extention, projectId: $Id) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file)\n  }\n"): (typeof documents)["\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DelProject($projectId: ID!) {\n  delProject(id:$projectId)\n}"): (typeof documents)["\nmutation DelProject($projectId: ID!) {\n  delProject(id:$projectId)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query projects2 {\n    projects2 {\n      _id\n      title\n      tech\n      link\n      video\n      extention\n      creator\n    }\n  }\n"): (typeof documents)["\n  query projects2 {\n    projects2 {\n      _id\n      title\n      tech\n      link\n      video\n      extention\n      creator\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;