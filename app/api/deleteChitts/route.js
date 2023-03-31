import { connect } from "../../../db";

export async function GET(request, { params }) {
  console.log(request.url);
  console.log(params);
  const client = await connect();
  const db = client.db();
  // await db.collection(collectionName).deleteMany({});
  client.close();
  return new Response("Success");
}
