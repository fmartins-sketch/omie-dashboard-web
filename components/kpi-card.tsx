type Props = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function KpiCard({ title, value, subtitle }: Props) {
  return (
    <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16 }}>
      <div style={{ color: "#64748b", fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{value}</div>
      {subtitle ? <div style={{ color: "#64748b", fontSize: 12, marginTop: 6 }}>{subtitle}</div> : null}
    </div>
  );
}
