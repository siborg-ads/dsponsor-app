import Providers from "@/providers/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-primaryBlack h-full relative">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
