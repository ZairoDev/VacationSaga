import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";
import { Property } from "@/models/listing";
import fs from "fs";
import path from "path";

connectDb();

const FILE_PATH = path.resolve("propertyCount.json");

const readFile = async () => {
  try {
    const data = await fs.promises.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { count: null, lastCalculated: 0 }; 
  }
};
const writeFile = async (data) => {
  try {
    await fs.promises.writeFile(FILE_PATH, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};

export async function GET(req) {
  try {
    const currentTime = Date.now();
    const { count, lastCalculated } = await readFile();

    if (lastCalculated && currentTime - lastCalculated < 24 * 60 * 60 * 1000) {
      return NextResponse.json({ count });
    } else {
      const propertyCount = await Property.find({country: "Greece"}).countDocuments();
      await writeFile({
        count: propertyCount,
        lastCalculated: currentTime,
      });

      return NextResponse.json({ count: propertyCount });
    }
  } catch (error) {
    console.error("Error calculating property count:", error);
    return NextResponse.json({
      message: "Failed to calculate property count",
    });
  }
}
