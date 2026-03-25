"use client";

import { createContext, useContext } from "react";

const ContentOverridesContext = createContext<Record<string, string>>({});

export function ContentOverridesProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Record<string, string>;
}) {
  return (
    <ContentOverridesContext.Provider value={value}>
      {children}
    </ContentOverridesContext.Provider>
  );
}

export function useContentOverrides() {
  return useContext(ContentOverridesContext);
}
