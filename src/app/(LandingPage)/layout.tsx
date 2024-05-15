"use client";
import React, { ReactNode, useState } from "react";
import { ModalProvider } from "@/context/globalContext";

function ChildLayout({ children }: { children: ReactNode }) {
  const [loadObjects, setLoadObjects] = useState(false);
  return (
    <ModalProvider value={{ loadObjects, setLoadObjects }}>
      {children}
    </ModalProvider>
  );
}

export default ChildLayout;
