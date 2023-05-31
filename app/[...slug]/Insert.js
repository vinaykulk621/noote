"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../supabase";

export async function Insert(params) {

  const router = useRouter();
  let table;
  if (params !== undefined) {
    table = params.params;
  }

  const handle = async (e) => {
    e.preventDefault();

    try {
      await supabase
        .from("pages")
        .insert([{ pages: table, content: e.target.content.value.trim() }]);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="fixed bottom-2 flex w-screen items-center justify-around bg-white"
      onSubmit={handle}>
      <textarea
        className="ml-2 flex-grow border-2 border-black p-2 placeholder:text-2xl"
        placeholder="Enter your note"
        name="content"
        required
      />
      <button
        className="m-2 rounded-lg bg-black p-2 text-center text-2xl text-white"
        type="submit">
        &#8594;
      </button>
    </form>
  );
}
