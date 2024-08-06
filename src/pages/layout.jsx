import Providers from "../providers/Providers";
// import { useState } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primaryBlack h-full relative">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
