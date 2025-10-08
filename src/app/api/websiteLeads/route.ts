import { connectDb } from "@/helper/db";
import WebsiteLeads from "@/models/websiteLeads";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
  try {
    const data = await req.json();
    const { firstName, lastName, telephone,VSID, email, message } = data;

    if (!firstName || !lastName || !telephone || !message || !VSID) {
      return new Response(
        JSON.stringify({ error: "Please fill all required fields." }),
        { status: 400 }
      );
    }

    await connectDb();
    const newMessage = await WebsiteLeads.create({
      firstName,
      lastName,
      telephone,
      VSID,
      email,
      message,
    });

    return new Response(
  JSON.stringify({ success: true, data: newMessage }),
  { status: 200 }
);
  } catch (error) {
    console.error("Error saving website Lead:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
