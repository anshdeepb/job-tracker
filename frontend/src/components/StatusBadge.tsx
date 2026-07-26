import { Badge } from "@/components/ui/badge"
import type { Application } from "@/types/Application"

const STATUS_STYLES: Record<Application["status"], string> = {
  applied: "bg-slate-100 text-slate-700",
  interviewing: "bg-amber-100 text-amber-700",
  offer: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
}

interface StatusBadgeProps {
  status: Application["status"]
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={STATUS_STYLES[status]}>
      {status}
    </Badge>
  )
}