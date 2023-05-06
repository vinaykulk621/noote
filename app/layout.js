import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
  title: "noote",
  description:
    "For Cheating during lab exams and sharing stuff online easily. DUH!!",
  keywords: "dontpad.com,note,notes_app,online_text_share,easy_share",
  author: "Vinay Kulkarni",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
