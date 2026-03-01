import { NextResponse } from "next/server";
import db from "../../../config/db.js"; // ✅ default import
import { UsersTable } from "../../../config/schema.js";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { email, credits } = await req.json();

    if (!email || credits === undefined) {
      return NextResponse.json(
        { error: "email and credits required" },
        { status: 400 }
      );
    }

    // Get current user
    const userRow = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.email, email));

    const currentCredits = userRow?.[0]?.credits || 0;

    // Update credits
    const result = await db
      .update(UsersTable)
      .set({ credits: currentCredits + Number(credits) })
      .where(eq(UsersTable.email, email))
      .returning();

    return NextResponse.json({ result: result?.[0] });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}