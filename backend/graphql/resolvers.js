import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import * as controller from "../controllers/resolverController.js"


const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    user: controller.qUser,
    projects: controller.qProjects,
    projects2: controller.qProjects2,
    uploads: () => "Hello uploads",
  },
  Mutation: {
    uploadFile: controller.mUploadFile,
    addProject: controller.mAddProject,
    editProject: controller.mEditProject,
    delProject: controller.mDelProject,
  },
}
export default resolvers;
