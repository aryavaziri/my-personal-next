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
      const path = `/app/backend/public/projects/${filename}`;
      const [id, extention] = filename.split('.')
      let video = false
      if (extention.toLowerCase() === "mov" || extention.toLowerCase() === "mp4" || extention.toLowerCase() === "mkv") { video = true }
      try {
        const res = new Promise((resolve, reject) => {
          stream
            .on('error', (error) => {
              if (stream.truncated)
                fs.unlinkSync(path);
              reject(error);
            })
            .pipe(fs.createWriteStream(path))
            .on('error', (error) => reject(error))
            .on('finish', () => resolve("OK"))
        });
        await Project.updateOne({ _id: id }, { video: video, extention: extention })
        return "OK"
      } catch (error) {
        console.log(error)
      }
    },

    addProject: async (root, args, contextValue) => {
      console.log("ADD-PROJECT")
      const tech = args.project.tech[0].split(',').map(item => item.trim())
      return Project.create({
        title: args.project.title,
        link: args.project.link,
        src: args.project.src,
        tech: tech,
        extention: args.extention,
      });
    },

    editProject: async (root, args, contextValue) => {
      const tech = args.project.tech[0].split(',').map(item => item.trim())
      await Project.updateOne({ _id: args.projectId }, { extention: args.extention, title: args.project.title, link: args.project.link, tech: tech })
      return await Project.findById(args.projectId)
    },
    delProject: async (root, args, contextValue) => {
      console.log("DEL-PROJECT", args)
      await Project.deleteOne({ _id: args.id });
      return "Deleted Successfully"
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
