import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const userFound = await prisma.user.findFirst({ where: { email } });
    if (userFound) {
      return NextResponse.json({ message: "The email is already in use." });
    }

    const user = await prisma.user.create({
      data: {

        email,
        password,
      },
    });

    const token = signToken({ id: user.id });

    const response = NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
