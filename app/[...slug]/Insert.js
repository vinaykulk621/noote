"use client";

import { supabase } from "../../supabase";

export async function Insert(params) {
  const table = params.params;

  return (
    <div className="fixed bottom-2 flex w-screen items-center space-x-2">
      <input
        type="text"
        className="m-2 w-11/12 border-2 border-black p-2"
        placeholder="Enter your text here"
        name="content"
        required
      />
      <button
        className="rounded-lg bg-black p-2 text-center text-3xl text-white"
        onClick={async (e) => {
          const inputVal = document
            .getElementsByName("content")[0]
            .value.trim();
          console.log(inputVal, "content hai bhai");
          try {
            const { data, error } = await supabase
              .from("pages")
              .insert([{ pages: table, content: inputVal }]);
            window.location.reload();
          } catch (e) {
            console.log(e);
          }
        }}
        type="button">
        Add
      </button>
    </div>
  );
}
