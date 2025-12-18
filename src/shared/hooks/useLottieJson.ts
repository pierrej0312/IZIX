"use client";

import * as React from "react";

export function useLottieJson(path: string) {
  const [data, setData] = React.useState<any | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let mounted = true;

    fetch(path)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`);
        return r.json();
      })
      .then((json) => mounted && setData(json))
      .catch((e) => mounted && setError(e));

    return () => {
      mounted = false;
    };
  }, [path]);

  return { data, error };
}
