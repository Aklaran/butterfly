import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("dev");

    const movies = await db.collection("tricks").find({}).limit(10).toArray();

    return NextResponse.json(movies);
  } catch (e) {
    console.error(e);
  }
}

// https://github.com/vercel/next.js/issues/48344#issuecomment-1548493646

export async function getTricks() {
  const url = await import("@/app/api/tricks/route");
  const response = await (await url.GET())?.json();
  return response;
}
