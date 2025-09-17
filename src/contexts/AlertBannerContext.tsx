/* eslint-disable no-unused-vars */
"use client";

import { createContext, useContext, useState } from "react";

interface AlertBannerContextType {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const AlertBannerContext = createContext<AlertBannerContextType | undefined>(undefined);

export const AlertBannerProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(true);

  return (
    <AlertBannerContext.Provider value={{ visible, setVisible }}>
      {children}
    </AlertBannerContext.Provider>
  );
};

export const useAlertBanner = () => {
  const context = useContext(AlertBannerContext);
  if (!context) {
    throw new Error("useAlertBanner must be used within AlertBannerProvider");
  }
  return context;
};
