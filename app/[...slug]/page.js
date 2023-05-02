import dynamic from "next/dynamic";
import { supabase } from "../../supabase";
import { Insert } from "./Insert";

const Buttom = dynamic(() => import("./Button"), { ssr: false });
export const revalidate = 0;

const content = async (table) => {
  try {
    let { data, error } = await supabase.from(table).select("*");
    return data || [" "];
  } catch (e) {
    console.log(e);
  }
};

const Home = async ({ params }) => {
  const data = await content(params.slug.join("_"));

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
                <Buttom id={msg.id} />
              </>
            );
          })}
        </div>
      </div>
      <Insert params={params.slug.join("_")} />
    </>
  );
};

export default Home;
