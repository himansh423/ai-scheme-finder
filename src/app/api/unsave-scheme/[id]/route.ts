import connectToDatabase from "@/library/database/db";
import SavedSchemes from "@/library/modal/SavedScheme";
import User from "@/library/modal/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const id = (await params).id;
    const { schemeId } = await req.json();
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const savedScheme = await SavedSchemes.findOneAndDelete({ _id: schemeId });
    if (!savedScheme) {
      return NextResponse.json(
        { success: false, message: "Scheme not found" },
        { status: 404 }
      );
    }

    await User.updateOne(
      { _id: id },
      { $pull: { savedSchemes: schemeId } }
    );

    return NextResponse.json({
      success: true,
      message: "Unsaved successfully",
    });
  } catch (error) {
    console.error("Error deleting saved scheme:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting saved scheme" },
      { status: 500 }
    );
  }
}
