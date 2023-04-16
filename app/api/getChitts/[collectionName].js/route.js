import { connect } from "../../../../db";

export async function GET(request) {
  const client = await connect();
  const db = client.db();
  const { searchParams } = new URL(request.url);
  const collectionName = searchParams.get("collectionName");

  // Check if collection exists
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some((c) => c.name === collectionName);

  // Create collection if it doesn't exist
  if (!collectionExists) {
    await db.createCollection(collectionName);

    return new Response([]);
  }

  // Get content from collection
  const content = await db.collection(collectionName).find().toArray();

  client.close();
  return new Response(content);
}
