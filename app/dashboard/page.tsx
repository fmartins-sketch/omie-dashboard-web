import KpiCard from "../../components/kpi-card";
import {
  formatCurrency,
  formatPercent,
  getCeoDashboard,
  getComercialDashboard,
  getFinanceiroDashboard,
} from "../../services/api";

export default async function DashboardPage() {
  const [ceo, financeiro, comercial] = await Promise.all([
    getCeoDashboard(),
    getFinanceiroDashboard(),
    getComercialDashboard(),
  ]);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard CEO</h1>
          <p className="mt-1 text-sm text-slate-500">
            Atualizado em {new Date(ceo.atualizado_em).toLocaleString("pt-BR")}
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Resumo executivo</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard title="Faturamento do período" value={formatCurrency(ceo.faturamento_mes)} />
            <KpiCard title="Receita líquida" value={formatCurrency(ceo.receita_liquida)} />
            <KpiCard
              title="EBITDA"
              value={formatCurrency(ceo.ebitda)}
              subtitle={`Margem ${formatPercent(ceo.margem_ebitda)}`}
            />
            <KpiCard title="Pipeline ponderado" value={formatCurrency(ceo.pipeline_ponderado)} />
            <KpiCard title="Caixa disponível" value={formatCurrency(ceo.caixa_disponivel)} />
            <KpiCard title="Saldo contas correntes" value={formatCurrency(ceo.saldo_contas_correntes)} />
            <KpiCard title="Caixa líquido" value={formatCurrency(ceo.caixa_liquido)} />
            <KpiCard title="Inadimplência" value={formatCurrency(ceo.inadimplencia)} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Bancos e liquidez</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <KpiCard title="Saldo total em contas" value={formatCurrency(financeiro.saldo_total_contas)} />
            <KpiCard title="Caixa líquido" value={formatCurrency(financeiro.caixa_liquido)} />
            <KpiCard title="Dívidas 7 dias" value={formatCurrency(financeiro.dividas_7)} />
            <KpiCard title="Dívidas 15 dias" value={formatCurrency(financeiro.dividas_15)} />
            <KpiCard title="Dívidas 30 dias" value={formatCurrency(financeiro.dividas_30)} />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h3 className="text-lg font-medium text-slate-900">Saldos por conta</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Banco</th>
                    <th className="px-4 py-3 text-left">Conta</th>
                    <th className="px-4 py-3 text-left">Agência</th>
                    <th className="px-4 py-3 text-left">Descrição</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {financeiro.saldos_contas.map((item, index) => (
                    <tr key={`${item.conta}-${index}`} className="border-t border-slate-100">
                      <td className="px-4 py-3">{item.banco}</td>
                      <td className="px-4 py-3">{item.conta}</td>
                      <td className="px-4 py-3">{item.agencia}</td>
                      <td className="px-4 py-3">{item.descricao}</td>
                      <td className="px-4 py-3">{item.status}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.saldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Dívidas e obrigações</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard title="Dívidas totais" value={formatCurrency(financeiro.dividas_total)} />
            <KpiCard title="Dívidas vencidas" value={formatCurrency(financeiro.dividas_vencidas)} />
            <KpiCard title="Pagar 7 dias" value={formatCurrency(financeiro.dividas_7)} />
            <KpiCard title="Pagar 30 dias" value={formatCurrency(financeiro.dividas_30)} />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h3 className="text-lg font-medium text-slate-900">Top obrigações</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Fornecedor</th>
                    <th className="px-4 py-3 text-left">Documento</th>
                    <th className="px-4 py-3 text-left">Vencimento</th>
                    <th className="px-4 py-3 text-left">Categoria</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {financeiro.top_obrigacoes.map((item, index) => (
                    <tr key={`${item.documento}-${index}`} className="border-t border-slate-100">
                      <td className="px-4 py-3">{item.fornecedor}</td>
                      <td className="px-4 py-3">{item.documento}</td>
                      <td className="px-4 py-3">{item.vencimento}</td>
                      <td className="px-4 py-3">{item.categoria}</td>
                      <td className="px-4 py-3">{item.status}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.valor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Recebíveis e inadimplência</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard title="Receber 30 dias" value={formatCurrency(ceo.receber_30)} />
            <KpiCard title="Pagar 30 dias" value={formatCurrency(ceo.pagar_30)} />
            <KpiCard title="Inadimplência" value={formatCurrency(ceo.inadimplencia)} />
            <KpiCard title="Top inadimplentes" value={`${financeiro.top_inadimplentes.length}`} />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4">
                <h3 className="text-lg font-medium text-slate-900">Aging receber</h3>
              </div>
              <div className="p-5 space-y-3">
                {financeiro.receber_aging.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-medium text-slate-900">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4">
                <h3 className="text-lg font-medium text-slate-900">Top inadimplentes</h3>
              </div>
              <div className="p-5 space-y-3">
                {financeiro.top_inadimplentes.map((item, index) => (
                  <div key={`${item.cliente}-${index}`} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{item.cliente}</span>
                    <span className="font-medium text-slate-900">{formatCurrency(item.valor)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Comercial</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard title="Oportunidades abertas" value={`${comercial.oportunidades_abertas}`} />
            <KpiCard title="Pipeline bruto" value={formatCurrency(comercial.pipeline_bruto)} />
            <KpiCard title="Pipeline ponderado" value={formatCurrency(comercial.pipeline_ponderado)} />
            <KpiCard title="Ticket médio" value={formatCurrency(comercial.ticket_medio)} />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4">
                <h3 className="text-lg font-medium text-slate-900">Funil comercial</h3>
              </div>
              <div className="p-5 space-y-3">
                {comercial.funil.map((item, index) => (
                  <div key={`${item.fase}-${index}`} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{item.fase}</span>
                    <span className="font-medium text-slate-900">{item.quantidade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4">
                <h3 className="text-lg font-medium text-slate-900">Top vendedores</h3>
              </div>
              <div className="p-5 space-y-3">
                {comercial.vendedores.map((item, index) => (
                  <div key={`${item.nome}-${index}`} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{item.nome}</span>
                    <span className="font-medium text-slate-900">{formatCurrency(item.pipeline)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
