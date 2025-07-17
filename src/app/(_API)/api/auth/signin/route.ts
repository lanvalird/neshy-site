import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const credentialsScheme = z.object({
  email: z.email().min(3).max(36),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validatedData = credentialsScheme.parse(data);

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword(validatedData);
    if (error) throw new Error("Authorization failed");

    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/account", req.url), {
      status: 302,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }
}
