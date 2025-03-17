import connectToDatabase from "@/library/database/db";
import User from "@/library/modal/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const id = (await params).id;
    const user = await User.findById(id).populate(
      "savedSchemes",
      "name category eligibility reason TrustScore schemeId"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user.savedSchemes,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong",
        },
        { status: 500 }
      );
    }
  }
}
