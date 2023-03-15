import { connect } from "../db";

const deleteChit = async (id, collectionName) => {
  const client = await connect();
  const db = client.db();
  await db.collection(collectionName).deleteOne({ _id: id });
  client.close();
};

const DeleteButton = ({ id, collectionName, onDelete }) => {
  const handleDelete = async () => {
    await deleteChit(id, collectionName);
    onDelete();
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;
