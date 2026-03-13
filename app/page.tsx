import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 32 }}>
      <h1 style={{ fontSize: 40, marginBottom: 12 }}>Omie Dashboard</h1>
      <p style={{ color: "#475569", marginBottom: 24 }}>Painel executivo web pronto para conectar ao backend FastAPI e à API do Omie.</p>
      <Link href="/dashboard" style={{ background: "#0f172a", color: "white", padding: "12px 18px", borderRadius: 10, textDecoration: "none" }}>
        Abrir dashboard
      </Link>
    </main>
  );
}
