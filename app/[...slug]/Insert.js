"use client";

export function Insert({ params }) {
  return (
    <div className="fixed bottom-2 flex w-screen items-center space-x-2">
      <input
        type="text"
        className="m-2 w-11/12 border-2 border-black p-2"
        placeholder="Enter your text here"
        name="content"
        required
      />
      <button
        className="rounded-lg bg-black p-2 text-center text-3xl text-white"
        onClick={async (e) => {
          console.log(params, "Insert");
          const content1 = e.target.content.value.trim();
          try {
            const { data, error } = await supabase
              .from(params)
              .insert([{ content: content1 }]);
            window.location.reload();
            console.log(data, "bhai im gay");
          } catch (e) {
            console.log(e);
          }
        }}
        type="submit">
        Add
      </button>
    </div>
  );
}
