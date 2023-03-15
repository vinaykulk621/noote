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
  }

  // Get content from collection
  const content = await db.collection(collectionName).find().toArray();

  client.close();
  return content;
};

export default async function Home({ params }) {
  const data = await content(params.slug.join("_"));
  return (
    <>
      {`${params.slug.join("_")}--->`}
      <ul>
        {data.map((msg) => {
          return <li key={msg._id}>{msg.msg}</li>;
        })}
      </ul>
    </>
  );
}
