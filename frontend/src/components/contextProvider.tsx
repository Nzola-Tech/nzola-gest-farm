import React from "react";

import { DbProvider } from "@/context/db";
import { PdvProvider } from "@/context/pdv";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <DbProvider>
        <PdvProvider>{children}</PdvProvider>
      </DbProvider>
    </>
  );
};
