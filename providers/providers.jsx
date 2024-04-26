import SDKProvider from "./SDKProvider";

function Providers({ children }) {
  return (
    <SDKProvider>
        {children}
    </SDKProvider>
  );
}
export default Providers;
