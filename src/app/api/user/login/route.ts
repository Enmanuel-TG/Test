import { signToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const userFound = await prisma.user.findFirst({ where: { email } });
    if (!userFound) return NextResponse.json({ Message: "user Not found" });
    if (password !== userFound.password)
      return NextResponse.json({ message: "Password not match" });

    const token = signToken({ id: userFound.id });
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json(
      {
        message: "Login completed",
      },
      { status: 200 }
    );
  } catch (error) {
      console.log(error)
    return NextResponse.json(
      {
        message: "error internal server",
      },
      { status: 500 }
    );
  }
}
