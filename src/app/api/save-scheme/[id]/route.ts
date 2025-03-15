import connectToDatabase from "@/library/database/db";
import SavedSchemes from "@/library/modal/SavedScheme";
import User from "@/library/modal/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const id = (await params).id;
    const payload = await req.json();
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    const saveScheme = new SavedSchemes({
      name: payload.name,
      category: payload.category,
      eligibility: payload.eligibility,
      reason: payload.reason,
      TrustScore: payload.TrustScore,
    });

    const savedScheme = await saveScheme.save();
    user.savedSchemes.push(savedScheme._id);
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: "Scheme Saved successfully",
        scheme: savedScheme,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving scheme:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
