"use server";

import type { AuthError } from "@supabase/supabase-js";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import * as z from "zod";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = validateForm(getFormData(formData));
  if (!data) return getError();

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) return getError(error);

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  
  const data = validateForm(getFormData(formData));
  if (!data) return getError();

  const { error } = await supabase.auth.signUp(data);

  if (error) return getError(error);

  revalidatePath("/", "layout");
  redirect("/account");
}

function validateForm(data: { email: string; password: string }) {
  const CredentialsScheme = z.object({
    email: z.string().min(3).max(36),
    password: z.string().min(6),
  });

  const result = CredentialsScheme.safeParse(data);

  if (!result.success) {
    return undefined;
  } else {
    return result.data;
  }
}

function getFormData(formData: FormData) {
  return {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
}

function getError(error?: AuthError | null) {
  if (error) console.log(error);
  redirect("/error");
}
