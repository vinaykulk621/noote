"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../supabase";


export async function submitDataToDatabase(formData) {
  try {
    await supabase
      .from("pages")
      .insert([{ pages: table, content: formData.get("content").trim() }]);
    revalidatePath("/[...slug]");
  } catch (e) {
    console.log(e);
  }
}



  export async function handle(params) {
    console.log(params.get("id"));
    try {
      await supabase.from("pages").delete().eq("id", params.get("id"));
      revalidatePath("/[...slug]");
    } catch (e) {
      console.log(e);
    }
  }