import Providers from "../components/Providers";
import "./globals.css";

export const metadata = {
  title: "Aimai",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-white bg-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
