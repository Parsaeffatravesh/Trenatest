import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { locale } = await request.json();

    if (!locale || !["fa", "en"].includes(locale)) {
      return NextResponse.json(
        { error: "Invalid locale" },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Locale saved to profile",
      locale,
    });

    response.cookies.set("app-locale", locale, {
      maxAge: 365 * 24 * 60 * 60,
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Error saving locale:", error);
    return NextResponse.json(
      { error: "Failed to save locale" },
      { status: 500 }
    );
  }
}
