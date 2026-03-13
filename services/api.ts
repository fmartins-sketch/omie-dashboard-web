export type CEOResponse = {
  empresa: string;
  periodo: string;
  faturamento_mes: number;
  receita_liquida: number;
  ebitda: number;
  margem_ebitda: number;
  caixa_disponivel: number;
  receber_30: number;
  pagar_30: number;
  pipeline_ponderado: number;
  custo_fixo: number;
  ponto_equilibrio: number;
  margem_seguranca: number;
  inadimplencia: number;
  roi?: number;
  ticket_medio?: number;
  atualizado_em: string;
};

export type FinanceiroResponse = {
  receber_aging: Array<{ label: string; value: number }>;
  pagar_aging: Array<{ label: string; value: number }>;
  fluxo_caixa: Array<{ horizonte: string; receber: number; pagar: number }>;
  top_inadimplentes: Array<{ cliente: string; valor: number }>;
};

export type ComercialResponse = {
  funil: Array<{ fase: string; quantidade: number }>;
  vendedores: Array<{ nome: string; receita?: number; pipeline?: number; qtd?: number }>;
  clientes: Array<{ nome: string; receita: number }>;
  pipeline_bruto: number;
  pipeline_ponderado: number;
  oportunidades_abertas: number;
  ticket_medio: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Erro na API (${response.status}): ${await response.text()}`);
  return response.json();
}

export async function getCeoDashboard(empresa = "consolidado", periodo = "mes_atual") {
  return apiFetch<CEOResponse>(`/api/v1/dashboard/ceo-real?empresa=${empresa}&periodo=${periodo}`);
}

export async function getFinanceiroDashboard() {
  return apiFetch<FinanceiroResponse>("/api/v1/dashboard/financeiro-real");
}

export async function getComercialDashboard() {
  return apiFetch<ComercialResponse>("/api/v1/dashboard/comercial-real");
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value || 0);
}

export function formatPercent(value: number) {
  return `${(value || 0).toFixed(1)}%`;
}
