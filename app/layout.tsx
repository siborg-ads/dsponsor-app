import Header01 from "../components/header/Header01";
import RootProvider from "./RootProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <RootProvider>
            <Header01 />
            {children}
          </RootProvider>
        </main>
      </body>
    </html>
  );
}
