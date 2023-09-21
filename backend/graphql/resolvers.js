import { User } from "../models/user.js";
import { List, Item } from "../models/list.js";

const resolvers = {
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
    lists: async () => await List.find({}),
  },
  Mutation: {
    addList: async (root, args, contextValue) => {
      const list = await List.findOne({
        title: args.title,
        author: contextValue.req.user._id,
      }).populate("items");
      if (list) {
        console.log("list exists");
        return list;
      }
      return List.create({
        title: args.title,
        author: contextValue.req.user._id,
      });
    },
    addItem: async (root, args, contextValue) => {
      const list = await List.findById(args.list).populate("items");
      if (list) {
        let item = await Item.findById(
          list.items
            .filter((item) => {
              return item.title === args.title;
            })
            .map((item) => {
              return item._id;
            })[0]?._id
        );
        if (item) {
          item.quantity += 1;
          await item.save();
          console.log("item exists. Quantity updated");
          return await List.findById(args.list).populate("items");
        } else {
          item = await Item.create({
            title: args.title,
            author: contextValue.req.user._id,
          });
          list.items.push(item);
          return list.save();
        }
      }
    },
  },
};
export default resolvers;
