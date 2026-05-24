import { statusColors } from "../data/dummy";

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[status] ?? "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
