export async function generateMetadata({ params }) {
  return {
    title: `noote | ${params.slug.join("_")}`,
    description:
      "For Cheating during lab exams and sharing stuff online easily. DUH!!",
    keywords: "dontpad.com,note,notes_app,online_text_share,easy_share",
    author: "Vinay Kulkarni",
  };
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="scrollbar scrollbar-thumb">{children}</body>
    </html>
  );
}
