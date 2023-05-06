import dynamic from "next/dynamic";
import { Insert } from "./Insert";
import content from "./content";
export const revalidate = 0;
const Buttom = dynamic(() => import("./Button"), { ssr: false });

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
                <div className="flex flex-row">
                  <Buttom
                    id={msg.id}
                    key={msg.id}
                  />
                  <pre
                    key={msg.id}
                    className="border-l-4 border-black bg-gray-100 p-2">
                    {msg.content}
                  </pre>
                </div>
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
