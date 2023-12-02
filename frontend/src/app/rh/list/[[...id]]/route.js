import { List, Item } from "@models/list";
import { connectToDB } from "@lib/database";

export const GET = async (req, res) => {
  // console.log(req.headers.get('token'))
  const response = await fetch('http://localhost:5000/rh/auth/validate', { headers: { 'token': req.headers.get('token') } })
  const { userId } = await response.json()
  // console.log(userId)

  await connectToDB();
  switch (res.params?.id?.length) {
    case 1:
      try {
        const list = await List.findById(res.params.id).populate("items").populate("creator");
        return new Response(JSON.stringify(list), { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to fetch list", { status: 500 });
      }
    case 2:
      break;
    default:
      try {
        const lists = await List.find({ creator: userId }).populate("items").populate("creator");
        console.log("lists123");
        return new Response(JSON.stringify({ lists }), { status: 200 });
        // return NextResponse.JSON.stringify(lists, { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all lists", { status: 500 });
      }
  }
};
export const POST = async (req, res) => {
  try {
    let userId = ""
    const response = await fetch('http://localhost:5000/rh/auth/validate', { headers: { 'token': req.headers.get('token') ?? "" } })
    try {
      const data = await response.json()
      data.userId = userId
    } catch (error) {
      console.log(error)
      return Response(JSON.stringify({}))
    }
    // if (!userId) throw new Error("Not authenticated")
    const { itemName, title } = await req.json();

    await connectToDB();
    console.log(res.params)
    console.log(res.params?.id?.length)
    switch (res.params?.id?.length) {
      case 1:
        try {
          let list = await List.findById(res.params.id[0]).populate("items");
          if (list.creator._id == userId) { console.log("YES") }
          const newItem = await Item.create({ itemName: itemName });
          console.log(itemName);
          // newItem.save();
          const temp = list.items.findIndex((item) => {
            return item.itemName === newItem.itemName;
          });
          if (temp == -1) {
            list.items.push(newItem);
            await list.save();
          } else {
            const item = await Item.findById(list.items[temp]._id);
            item.done = false;
            await item.save();
            list = await List.findById(res.params.id[0]).populate("items").populate("creator");
          }
          return list ? new Response(JSON.stringify(list), { status: 200 }) : Response(JSON.stringify({}));
        } catch (error) {
          console.log(error);
          return new Response("Failed to add a new item to the List", {
            status: 500,
          });
        }
        break;
      case 2:
        break;
      default:
        try {
          if (userId) {
            console.log(userId)
            const newList = await List.create({ creator: userId, title });
            return new Response("New List created successfully", { status: 201 });
          } else {
            throw new Error("You must be logged in to create a new list");
          }
        } catch (error) {
          console.log("ERROR - ", error.message);
          return new Response("Failed to create a new List", { status: 500 });
        }
    }
  } catch (error) {
    console.log(error.message)
  }
};

export const DELETE = async (req, res) => {
  await connectToDB();
  switch (res.params?.id?.length) {
    case 2:
      let list;
      try {
        if (res.params.id[1] == "ALL") {
          list = await List.findById(res.params.id[0]).populate("items");
          list.items = [];
          list.save();
        } else {
          // const item = await Item.findById(res.params.id[1])
          list = await List.findById(res.params.id[0]).populate("items");
          console.log(list)
          const temp = list.items.filter((item) => item._id.toString() !== res.params.id[1]);
          list.items = temp;
          console.log(list)
          list.save();
        }
        // return new Response(JSON.stringify(list), { status: 200 });
        return new Response("Item deleted successfully!", { status: 200 });
      } catch (error) {
        console.log(error.message);
        return new Response("Failed to Delete the item from the list", {
          status: 500,
        });
      }
      break;
    case 1:
      try {
        await List.findByIdAndDelete(res.params?.id[0]);
        return new Response("List deleted successfully!", { status: 200 });
      } catch (error) {
        return new Response("Failed to delete the lsit", { status: 500 });
      }
  }
};

export const PUT = async (request, res) => {
  try {
    await connectToDB();
    console.log("HOOOHOHOHOHO")
    // const item = await Item.findById({ _id: res.params.id[1] })
    switch (res.params?.id?.length) {
      case 2:
        if (res.params.id[1] === "ALL") {
          const list = await List.findById({ _id: res.params.id[0] }).populate("items");
          newItemList = list.items.map((element) => {
            element.done = false;
            element.save();
            return element;
          });
        } else {
          console.log("HOOOHOHOHOHO")
          if (res.params.id[0] === "complete") {
            const item = await Item.findByIdAndUpdate(res.params.id[1]);
            item.done = !item.done
            item.save();
          };
        }
        break;
      default:
        break;
    }
    return new Response("Updated successfully.", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the List", {
      status: 500,
    });
  }
};
