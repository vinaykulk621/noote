import { MongoClient } from "mongodb";
let uri = process.env.URI;
export async function connect() {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}
