import { User } from "../models/user.js";
import { Project } from "../models/project.js";
import { List, Item } from "../models/list.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    user: async (_, { name }, contextValue) => {
      let user = [];
      if (name) {
        user = await User.find({ name: name });
      } else {
        user = await User.find({});
      }
      return user;
    },
    projects: async () => await Project.find({}),
    uploads: () => "Hello uploads",
  },
  Mutation: {
    singleUpload: async (parent, {file}) => {
      console.log("HI")
      try {
        console.log("HI")
        const file2 = await file;
        console.log(file2);
        return "OKKKK";
      } catch (error) {
        console.log(error);
      }
    },
    addProject: async (root, args, contextValue) => {
      console.log("HI")
      // args.media[0];
      const tech = args.project.tech.split(';').map(item => item.trim())

      return Project.create({
        title: args.project.title,
        link: args.project.link,
        src: args.project.src,
        tech: tech,
      });
    },

    // addList: async (root, args, contextValue) => {
    //   const list = await List.findOne({
    //     title: args.title,
    //     author: contextValue.req.user._id,
    //   }).populate("items");
    //   if (list) {
    //     console.log("list exists");
    //     return list;
    //   }
    //   return List.create({
    //     title: args.title,
    //     author: contextValue.req.user._id,
    //   });
    // }
  },
};
export default resolvers;
