import Header01 from "../components/header/Header01";
import Footer from "../components/footer";
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
            <Footer></Footer>
          </RootProvider>
        </main>
      </body>
    </html>
  );
}
