import dynamic from "next/dynamic";
import { supabase } from "../../supabase";
import { Insert } from "./Insert";

const Buttom = dynamic(() => import("./Button"), { ssr: false });
export const revalidate = 0;

const content = async (table) => {
  console.log(table);
  try {
    const { data, error } = await supabase.from("pages").select("pages");
    const { data2, error2 } = await supabase.from("content").select("page");
    const pages = [];
    data.forEach((e) => {
      pages.push(e.pages);
    });
    if (pages.includes(table)) {
      try {
        const { data, error } = await supabase
        .from("content")
        .select(`content,pages(page)`);
        return data || [" "];
      } catch (e) {
        console.log(e);
      }
    }
    if (!pages.includes(table)) {
      try {
        const { data, error } = await supabase
        .from("pages")
        .insert([{ pages: table }]);
        const { data2, error2 } = await supabase.from("content").select("page");
        if (!data2) {
          const { data2, error2 } = await supabase
            .from("content")
            .insert([{ page: table }]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (error) {
      return [" "];
    }
  } catch (e) {
    console.log(e);
  }
  return [" "];
};

const Home = async ({ params }) => {
  const table = params.slug.join("_");
  const data = await content(table);

  return (
    <>
      <div className="xs:flex xs:items-center xs:justify-center xs:mb-16 mb-16 md:flex md:items-center md:justify-center">
        <div className="flex flex-col items-start justify-start space-y-4 p-2">
          {data.map((msg) => {
            return (
              <>
                <pre
                  key={msg.id}
                  className="border-l-4 border-black bg-gray-100 p-2">
                  {msg.content}
                </pre>
                <Buttom
                  id={msg.id}
                  key={msg.id}
                />
              </>
            );
          })}
        </div>
      </div>
      <Insert params={table} />
    </>
  );
};

export default Home;
