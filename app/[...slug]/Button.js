"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../supabase";

const Button = async ({ id }) => {
  const router = useRouter();
  const handle = async () => {
    try {
      await supabase.from("pages").delete().eq("id", id);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button
      onClick={handle}
      className="right-2 top-5 m-1 flex-grow-0 rounded-sm bg-zinc-500 px-1 py-0 text-xl text-white">
      X
    </button>
  );
};

export default Button;
