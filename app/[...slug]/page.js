import { Button } from "./Button";
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

export default async function Home({ params }) {
  const data = await content(params.slug.join("_"));

  return (
    <div className="xs:flex xs:items-center xs:justify-center xs:mb-16 mb-16 md:flex md:items-center md:justify-center">
      <div className="flex flex-col items-start justify-start space-y-4 p-2">
        {data.map((msg) => {
          return (
            <>
              <pre
                key={msg._id}
                className="border-l-4 border-black bg-gray-100 p-2">
                {msg.msg}
              </pre>
              <Button
                key={msg._id + 1}
                collectionName={params.slug.join("_")}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
