import { User } from "../models/user.js";
import { Project } from "../models/project.js";
import { List, Item } from "../models/list.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import fs from 'fs';

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
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const path = `/app/backend/public/${filename}`;
      return new Promise((resolve, reject) => {
        stream
          .on('error', (error) => {
            if (stream.truncated)
              fs.unlinkSync(path);
            reject(error);
          })
          .pipe(fs.createWriteStream(path))
          .on('error', (error) => reject(error))
          // .on('finish', () => resolve({ filename, mimetype, encoding }))
          .on('finish', () => resolve("OK"))
      });
    },
    
    addProject: async (root, args, contextValue) => {
      console.log("PROJECT")
      const tech = args.project.tech.split(';').map(item => item.trim())
      let video = false
      if(args.extention.toLowerCase()===".mov" ||args.extention.toLowerCase()===".mp4" || args.extention.toLowerCase()===".mkv"){
        video = true 
      }
      return Project.create({
        title: args.project.title,
        link: args.project.link,
        src: args.project.src,
        tech: tech,
        extention: args.extention,
        video: video
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
