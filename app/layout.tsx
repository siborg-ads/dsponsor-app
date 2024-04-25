
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
            {children}
          </RootProvider>
        </main>
      </body>
    </html>
  );
}