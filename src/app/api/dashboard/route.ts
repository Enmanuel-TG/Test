import getTokenId from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content } = body;
    const id = getTokenId(req);

    const nota = await prisma.note.create({
      data: {
        title,
        content,
        userId: id,
      },
    });
    return NextResponse.json({
      nota,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error internal server",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = getTokenId(req);
    const nota = await prisma.note.findMany({
      where: { userId: id },
    });
    return NextResponse.json(nota);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        Message: "Error Internal server",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const nota = await prisma.note.delete({
      where: { id },
    });
    return NextResponse.json({
      nota,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        Message: "Error Internal server",
      },
      { status: 500 }
    );
  }
}
