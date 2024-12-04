  import { Property } from "@/models/listing";
  import { connectDb } from "../../../../helper/db";
  import { NextResponse } from "next/server";
 


  connectDb();

  export async function POST(request) {
    try {
      const reqBody = await request.json();
      const { userId } = reqBody;
      console.log("call in request", userId, request.body);

      if (!userId) {
        return NextResponse.json(
          { error: "User ID is required" },
          { status: 400 }
        );
      }
      const properties = await Property.find({ userId: userId, isLive: true });
      console.log("propertiesL ", properties);

      if (!properties.length) {
        return NextResponse.json(
          { message: "No properties found for this user" },
          { status: 404 }
        );
      }
      return NextResponse.json({ properties }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
