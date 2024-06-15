import Providers from "../providers/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-jacarta-800 h-full relative">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
