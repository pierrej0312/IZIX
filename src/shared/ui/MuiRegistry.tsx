"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

function createEmotionCache() {
  return createCache({ key: "mui", prepend: true });
}

export default function MuiRegistry({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo(() => createEmotionCache(), []);
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
