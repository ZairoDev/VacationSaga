import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/question";
import { connectDb } from "@/helper/db";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title parameter is missing" },
        { status: 400 }
      );
    }

    // Find questions by title using case-insensitive regex
    const questions = await Question.find({
      title: { $regex: title, $options: "i" },
    });

    return NextResponse.json({ success: true, questions }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
