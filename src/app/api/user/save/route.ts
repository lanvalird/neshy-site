import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userScheme = z.object({
  username: z.string().min(6).max(36) || z.undefined(),
  // skin: z.string()
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = userScheme.parse({
      username: formData.get("username"),
    });

    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!user || error) {
      throw new Error("Authorization failed");
    }

    const { error: errorSave } = await supabase.from("accounts").upsert({
      id: user?.id as string,
      username: data.username,
      updated_at: new Date().toISOString(),
    });
    if (errorSave) {
      throw new Error("Error save data");
    }

    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/account", req.url), {
      status: 302,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
