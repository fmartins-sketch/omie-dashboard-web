import type { ReactNode } from "react";

export const metadata = {
  title: "Omie Dashboard",
  description: "Cockpit executivo integrado ao Omie",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f8fafc", color: "#0f172a" }}>
        {children}
      </body>
    </html>
  );
}
