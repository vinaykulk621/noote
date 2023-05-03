import dynamic from "next/dynamic";
import { supabase } from "../../supabase";
import { Insert } from "./Insert";

const Buttom = dynamic(() => import("./Button"), { ssr: false });
export const revalidate = 0;

const content = async (table) => {
  try {
    console.log(table);
    const { data, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_name", table);

    if (error) console.log("Error checking table:", error);
    else if (data.length > 0) {
      try {
        let { data, error } = await supabase.from(table).select("*");
        return data || [" "];
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const { data, error } = await supabase.from(table).create({
          id: "uuid not null default uuid_generate_v4 () PRIMARY KEY",
          created_at: "timestamp with time zone not null default now()",
          content: "text not null default ''::text",
        });
        return [" "];
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log("Error checking table:", error);
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
