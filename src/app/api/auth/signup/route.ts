import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from 'next/server'
import { z } from "zod";

const credentialsScheme = z.object({
  email: z.email().min(3).max(36),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = credentialsScheme.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const supabase = await createClient();

    const { error } = await supabase.auth.signUp(data);
    if (error) throw new Error("Authorization failed");

    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/login?email_verified=false", req.url), {
      status: 302,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
