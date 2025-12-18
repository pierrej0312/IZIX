"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import MuiRegistry from "./MuiRegistry";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MuiRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MuiRegistry>
  );
}
