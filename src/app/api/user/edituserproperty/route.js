import { Property } from "../../../../models/listing";
import { connectDb } from "../../../../helper/db";
import { ObjectId } from "mongodb";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { propertyId, updatedData, userId } = reqBody;
    console.log('updated data: ', updatedData);
    delete updatedData.VSID;

    if (!propertyId || !updatedData || !userId) {
      return new Response(
        JSON.stringify({
          error: "Property ID, updated data, and user ID are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const pId = new ObjectId(propertyId);
    const property = await Property.findOneAndUpdate(
      { _id: pId },
      { $set: updatedData },
      { new: true }
    );

    console.log('updated Property: ', property);
    

    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ property }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}