"use client";

import { supabase } from "../../supabase";

const Button = async ({ id }) => {
  return (
    <button
      key={id}
      onClick={async () => {
        try {
          const { data, error } = await supabase
            .from("g")
            .delete()
            .eq("id", id);
          window.location.reload();
        } catch (e) {
          console.log(e);
        }
      }}
      className="right-2 top-5 m-1 rounded-lg bg-red-600 p-1 text-2xl">
      Delete
    </button>
  );
};

export default Button;
