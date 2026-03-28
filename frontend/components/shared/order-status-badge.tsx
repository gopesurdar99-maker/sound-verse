type Props = {
  status: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-300 border-yellow-400/20",
  confirmed: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  packed: "bg-purple-500/15 text-purple-300 border-purple-400/20",
  dispatched: "bg-indigo-500/15 text-indigo-300 border-indigo-400/20",
  out_for_delivery: "bg-orange-500/15 text-orange-300 border-orange-400/20",
  delivered: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  cancelled: "bg-red-500/15 text-red-300 border-red-400/20",
};

function formatStatus(status: string) {
  if (!status) return "";
  return status.replaceAll("_", " ");
}

export default function OrderStatusBadge({ status }: Props) {
  const style =
    statusStyles[status] || "bg-white/10 text-zinc-300 border-white/10";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${style}`}
    >
      {formatStatus(status)}
    </span>
  );
}
