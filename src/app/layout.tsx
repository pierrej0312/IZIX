import type { Metadata } from "next";
import AppProviders from "@/shared/ui/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "IZIX – Smart Guest Pool",
  description: "Ensure parking availability for event guests under uncertainty.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
