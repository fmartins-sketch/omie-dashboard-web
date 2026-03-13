import KpiCard from "@/components/kpi-card";
import { formatCurrency, formatPercent, getCeoDashboard, getComercialDashboard, getFinanceiroDashboard } from "@/services/api";

export default async function DashboardPage() {
  const [ceo, financeiro, comercial] = await Promise.all([
    getCeoDashboard(),
    getFinanceiroDashboard(),
    getComercialDashboard(),
  ]);

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 34, marginBottom: 8 }}>Cockpit Executivo</h1>
      <p style={{ color: "#475569", marginBottom: 24 }}>Visão consolidada de faturamento, resultado, caixa e comercial.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        <KpiCard title="Faturamento do mês" value={formatCurrency(ceo.faturamento_mes)} />
        <KpiCard title="EBITDA" value={formatCurrency(ceo.ebitda)} subtitle={`Margem ${formatPercent(ceo.margem_ebitda)}`} />
        <KpiCard title="Caixa disponível" value={formatCurrency(ceo.caixa_disponivel)} />
        <KpiCard title="Receber 30 dias" value={formatCurrency(ceo.receber_30)} />
        <KpiCard title="Pagar 30 dias" value={formatCurrency(ceo.pagar_30)} />
        <KpiCard title="Pipeline ponderado" value={formatCurrency(ceo.pipeline_ponderado)} />
        <KpiCard title="Custo fixo" value={formatCurrency(ceo.custo_fixo)} />
        <KpiCard title="Ponto de equilíbrio" value={formatCurrency(ceo.ponto_equilibrio)} />
      </div>

      <section style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16 }}>
          <h2>Financeiro</h2>
          <p>Inadimplência: <strong>{formatCurrency(ceo.inadimplencia)}</strong></p>
          <ul>
            {financeiro.top_inadimplentes.map((item) => (
              <li key={item.cliente}>{item.cliente}: {formatCurrency(item.valor)}</li>
            ))}
          </ul>
        </div>
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16 }}>
          <h2>Comercial</h2>
          <p>Oportunidades abertas: <strong>{comercial.oportunidades_abertas}</strong></p>
          <p>Ticket médio: <strong>{formatCurrency(comercial.ticket_medio)}</strong></p>
          <ul>
            {comercial.vendedores.map((item) => (
              <li key={item.nome}>{item.nome}: pipeline {formatCurrency(item.pipeline || 0)}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
