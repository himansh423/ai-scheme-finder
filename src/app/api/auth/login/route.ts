import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import connectToDatabase from "@/library/database/db";
import User from "@/library/modal/User";


const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

  

    const token = jwt.sign(
      {
        userId: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
      },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      userId: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    });

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    if(error instanceof Error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
