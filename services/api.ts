export type CEOResponse = {
  empresa: string;
  periodo: string;
  faturamento_mes: number;
  receita_liquida: number;
  ebitda: number;
  margem_ebitda: number;
  caixa_disponivel: number;
  saldo_contas_correntes: number;
  caixa_liquido: number;
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
  receber_aging: { label: string; value: number }[];
  pagar_aging: { label: string; value: number }[];
  fluxo_caixa: { horizonte: string; receber: number; pagar: number }[];
  top_inadimplentes: { cliente: string; valor: number }[];
  dividas_total: number;
  dividas_vencidas: number;
  dividas_7: number;
  dividas_15: number;
  dividas_30: number;
  top_obrigacoes: {
    fornecedor: string;
    documento: string;
    vencimento: string;
    categoria: string;
    valor: number;
    status: string;
  }[];
  saldos_contas: {
    banco: string;
    conta: string;
    agencia: string;
    descricao: string;
    saldo: number;
    status: string;
  }[];
  saldo_total_contas: number;
  caixa_liquido: number;
};

export type ComercialResponse = {
  funil: { fase: string; quantidade: number }[];
  vendedores: { nome: string; receita: number; pipeline: number; qtd: number }[];
  clientes: { nome: string; receita: number }[];
  pipeline_bruto: number;
  pipeline_ponderado: number;
  oportunidades_abertas: number;
  ticket_medio: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json();
}

export async function getCeoDashboard(): Promise<CEOResponse> {
  return apiFetch<CEOResponse>("/api/v1/dashboard/ceo-real");
}

export async function getFinanceiroDashboard(): Promise<FinanceiroResponse> {
  return apiFetch<FinanceiroResponse>("/api/v1/dashboard/financeiro-real");
}

export async function getComercialDashboard(): Promise<ComercialResponse> {
  return apiFetch<ComercialResponse>("/api/v1/dashboard/comercial-real");
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatPercent(value: number): string {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
}
