// "use client";
import { connect } from "../../db";

const content = async (collectionName) => {
  const client = await connect();
  const db = client.db();

  // Check if collection exists
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some((c) => c.name === collectionName);

  // Create collection if it doesn't exist
  if (!collectionExists) {
    await db.createCollection(collectionName);

    return [];
  }

  // Get content from collection
  const content = await db.collection(collectionName).find().toArray();

  client.close();
  return content;
};

const deleteChits = async () => {
  try {
    const res = await fetch("/api/deleteChitts");
  } catch (e) {
    console.log(e);
  }
};
export default async function Home({ params }) {
  const data = await content(params.slug.join("_"));

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-start justify-start space-y-4 p-2">
        {data.map((msg) => {
          return (
            <>
              <pre
                key={msg._id}
                className="border-l-4 border-black bg-gray-100 p-2">
                {msg.msg}
              </pre>
              <button
                className="fixed top-5 right-2 m-1 rounded-lg bg-red-600 p-1 text-2xl"
                // onClick={deleteChits}
              >
                delete-everything
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
}
