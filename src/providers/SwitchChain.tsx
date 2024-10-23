// import React, { createContext, useState, useContext, ReactNode } from "react";
// import config from "@/config/config";

// interface SwitchChainContextType {
//   selectedChain: string;
//   setSelectedChain: React.Dispatch<React.SetStateAction<string>>;
// }

// const SwitchChainContext = createContext<SwitchChainContextType>({
//   selectedChain: Object.values(config)[0]?.network as string,
//   setSelectedChain: () => {}
// });

// interface SwitchChainProviderProps {
//   children: ReactNode;
// }

// const SwitchChainProvider: React.FC<SwitchChainProviderProps> = ({ children }) => {
//   const [selectedChain, setSelectedChain] = useState<string>(Object.values(config)[0]?.network);

//   return (
//     <SwitchChainContext.Provider
//       value={{
//         selectedChain,
//         setSelectedChain
//       }}
//     >
//       {children}
//     </SwitchChainContext.Provider>
//   );
// };

// const useSwitchChainContext = () => {
//   return useContext(SwitchChainContext);
// };

// export { SwitchChainProvider, useSwitchChainContext };
