"use client";

const deleteChits = async (collectionName) => {
  console.log(collectionName);
  fetch("/api/delete", {
    method: "POST",
    body: JSON.stringify({ collectionName: collectionName }),
  });
};

export function Button({ collectionName }) {
  console.log("before anything happens", collectionName);
  return (
    <button
      className="fixed top-5 right-2 m-1 rounded-lg bg-red-600 p-1 text-2xl"
      onClick={() => deleteChits(collectionName)}>
      delete-everything
    </button>
  );
}
