import { List, Item } from "@models/list";
import { connectToDB } from "@lib/database";
import { NextResponse } from "next/server";
import { headers } from 'next/headers'

export const GET = async (req, res) => {
  const token = headers().get("token");
  // console.log(token);
  const fetchData = await fetch(`https://aryav.nl/api/getuser`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((err) => console.log(err.message));

  const userId = fetchData?._id || ""
  try {
    await connectToDB();
    const lists = userId ? await List.find({ creator: userId })?.populate("items")?.populate("creator") : [];
    return NextResponse.json(lists, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};

// export const POST = async (req, res) => {
//   try {
//     let userId
//     const response = await fetch(`${process.env.hostname}/rh/auth/validate`, { headers: { 'token': req.headers.get('token') ?? "" } })
//     try {
//       const data = await response.json()
//       userId = data.userId
//     } catch (error) {
//       console.log(error)
//       return Response(JSON.stringify({}))
//     }
//     // if (!userId) throw new Error("Not authenticated")
//     const { itemName, title } = await req.json();

//     await connectToDB();
//     console.log(res.params)
//     console.log(res.params?.id?.length)
//     switch (res.params?.id?.length) {
//       case 1:
//         try {
//           let list = await List.findById(res.params.id[0]).populate("items");
//           if (list.creator._id == userId) {
//             const temp = list.items.findIndex((item) => {
//               return item.itemName === newItem.itemName;
//             });
//             if (temp == -1) {
//               const newItem = await Item.create({ itemName: itemName });
//               list.items.push(newItem);
//               await list.save();
//             } else {
//               const item = await Item.findById(list.items[temp]._id);
//               item.done = false;
//               await item.save();
//             }
//           }
//         } catch (error) {
//           console.log(error);
//           return new Response("Failed to add a new item to the List", {
//             status: 500,
//           });
//         }
//         break;
//       case 2:
//         break;
//       default:
//         try {
//           if (userId) {
//             const newList = await List.create({ creator: userId, title });
//             console.log(userId, ` added a new list.`)
//             return new Response("New List created successfully", { status: 201 });
//           } else {
//             throw new Error("You must be logged in to create a new list");
//           }
//         } catch (error) {
//           console.log("ERROR - ", error.message);
//           return new Response("Failed to create a new List", { status: 500 });
//         }
//     }
//   } catch (error) {
//     console.log(error.message)
//   }
// };

// export const DELETE = async (req, res) => {
//   await connectToDB();
//   switch (res.params?.id?.length) {
//     case 2:
//       let list;
//       try {
//         if (res.params.id[1] == "ALL") {
//           list = await List.findById(res.params.id[0]).populate("items");
//           list.items = [];
//           list.save();
//         } else {
//           // const item = await Item.findById(res.params.id[1])
//           list = await List.findById(res.params.id[0]).populate("items");
//           console.log(list)
//           const temp = list.items.filter((item) => item._id.toString() !== res.params.id[1]);
//           list.items = temp;
//           console.log(list)
//           list.save();
//         }
//         // return new Response(JSON.stringify(list), { status: 200 });
//         return new Response("Item deleted successfully!", { status: 200 });
//       } catch (error) {
//         console.log(error.message);
//         return new Response("Failed to Delete the item from the list", {
//           status: 500,
//         });
//       }
//       break;
//     case 1:
//       try {
//         await List.findByIdAndDelete(res.params?.id[0]);
//         return new Response("List deleted successfully!", { status: 200 });
//       } catch (error) {
//         return new Response("Failed to delete the lsit", { status: 500 });
//       }
//   }
// };

// export const PUT = async (request, res) => {
//   try {
//     await connectToDB();
//     console.log("HOOOHOHOHOHO")
//     // const item = await Item.findById({ _id: res.params.id[1] })
//     switch (res.params?.id?.length) {
//       case 2:
//         if (res.params.id[1] === "ALL") {
//           const list = await List.findById({ _id: res.params.id[0] }).populate("items");
//           newItemList = list.items.map((element) => {
//             element.done = false;
//             element.save();
//             return element;
//           });
//         } else {
//           console.log("HOOOHOHOHOHO")
//           if (res.params.id[0] === "complete") {
//             const item = await Item.findByIdAndUpdate(res.params.id[1]);
//             item.done = !item.done
//             item.save();
//           };
//         }
//         break;
//       default:
//         break;
//     }
//     return new Response("Updated successfully.", { status: 200 });
//   } catch (error) {
//     return new Response("Failed to update the List", {
//       status: 500,
//     });
//   }
// };
