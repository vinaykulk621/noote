import { connect } from "../../../db";

export async function POST(request) {
  console.log(request.body);
  const { collectionName } = request.body;
  console.log(collectionName);
  const client = await connect();
  const db = client.db();
  await db.collection(collectionName).deleteMany({});
  client.close();
  return new Response("Success");
}
