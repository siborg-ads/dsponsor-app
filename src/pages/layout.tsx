import { ThirdwebProvider } from "thirdweb/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative h-full bg-primaryBlack">
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
