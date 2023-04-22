"use client";

const content = async (collectionName) => {
  // console.log(collectionName);
  try {
    const response = await fetch(`/api/get/${collectionName}`);
    const data = await response.json();
    // console.log(data);
    return [];
  } catch (e) {
    console.log(e);
  }
};

const Home = async ({ params }) => {
  const data = await content(params.slug.join("_"));

  return (
    <div className="xs:flex xs:items-center xs:justify-center xs:mb-16 mb-16 md:flex md:items-center md:justify-center">
      <div className="flex flex-col items-start justify-start space-y-4 p-2">
        {data === undefined ? (
          <p>Loading</p>
        ) : (
          data.map((msg) => {
            return (
              <>
                <pre
                  key={msg._id}
                  className="border-l-4 border-black bg-gray-100 p-2">
                  {msg.msg}
                </pre>
                <button
                  key={msg._id}
                  className="fixed right-2 top-5 m-1 rounded-lg bg-red-600 p-1 text-2xl"
                  onClick={() => deleteChits(collectionName)}>
                  delete-everything
                </button>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
