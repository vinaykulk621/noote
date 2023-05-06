import { supabase } from "../../supabase";

const content = async (table) => {
  const pages = [];
  try {
    const { data, error } = await supabase.from("pages").select("pages");
    if (error) {
      return [" "];
    }

    data.forEach((e) => {
      pages.push(e.pages);
    });

    if (pages.includes(table)) {
      try {
        const { data, error } = await supabase
          .from("pages")
          .select()
          .eq("pages", table);

        return data || [" "];
      } catch (e) {
        console.log(e);
      }
    }

    if (!pages.includes(table)) {
      try {
        const { data, error } = await supabase
          .from("pages")
          .insert([{ pages: table, content: "noote" }]);

        return [" "];
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export default content;
