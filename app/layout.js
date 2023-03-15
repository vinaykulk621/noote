import "./globals.css";

export const metadata = {
  title: "Chitti-Webapplication-Bro",
  description:
    "For Cheating during lab exams and sharing stuff online easily. DUH!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
