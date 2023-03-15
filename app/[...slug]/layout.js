export const metadata = {
  title: "Chitti",
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
