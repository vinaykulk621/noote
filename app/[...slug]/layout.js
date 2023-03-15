export const metadata = {
  title: "Chitti",
  description:
    "For Cheating during lab exams and sharing stuff online easily. DUH!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <button className="fixed top-5 right-2 m-1 rounded-lg bg-red-600 p-1 text-2xl">
          delete-everything
        </button>
        {children}
      </body>
    </html>
  );
}
