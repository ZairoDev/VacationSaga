const Blog = require("@/models/blog");
const { connectDb } = require("@/helper/db");
import { NextResponse } from "next/server";

connectDb();

export async function GET(req) {
  try {
    const blogs = await Blog.find().limit(4).sort({ _id: 1 });
    return NextResponse.json(
      {
        success: true,
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
