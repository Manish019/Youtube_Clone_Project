import { createContext, useState } from "react";

export const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [sideNavbar, setSideNavbar] = useState(false);

  const sidebarFun = (value) => {
    setSideNavbar(value);
  };

  return (
    <SidebarContext.Provider value={{ sideNavbar, setSideNavbar }}>
      {children}
    </SidebarContext.Provider>
  );
}
