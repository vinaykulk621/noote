"use client";

import { supabase } from "../../supabase";

const Button = async ({ id, params }) => {
  const table = params;
  console.log(id, params);
  return (
    <button
      onClick={async () => {
        try {
          const { data, error } = await supabase
            .from("pages")
            .delete()
            .eq("id", id);
          window.location.reload();
        } catch (e) {
          console.log(e);
        }
      }}
      className="right-2 top-5 m-1 rounded-lg bg-red-600 p-1 text-xl">
      Delete
    </button>
  );
};

export default Button;
