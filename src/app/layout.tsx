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
      <body className="dark max-w-sm w-full mx-auto min-h-[100dvh] bg-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
