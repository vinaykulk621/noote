export const metadata = {
  title: "Chitti",
  description:
    "For Cheating during lab exams and sharing stuff online easily. DUH!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="fixed bottom-2 flex w-screen items-center space-x-2">
          <input
            type="text"
            className="m-2 w-11/12 border-2 border-black p-2"
            placeholder="Enter your text here"
          />
          <button className="rounded-lg bg-black p-2 text-center text-3xl text-white">
            Add
          </button>
        </div>
      </body>
    </html>
  );
}
