import { connect } from "../../../db";

export async function GET(request) {
  console.log(request.url);
  const client = await connect();
  const db = client.db();
  // await db.collection(collectionName).deleteMany({});
  client.close();
  return new Response("Hello, Next.js!");
}
