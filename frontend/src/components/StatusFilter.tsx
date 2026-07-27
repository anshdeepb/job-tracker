import { Button } from "@/components/ui/button"
import type { Application } from "@/types/Application"

type StatusOption = Application["status"] | "all"

interface StatusFilterProps {
  currentFilter: StatusOption
  onFilterChange: (status: StatusOption) => void
}

const OPTIONS: { value: StatusOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
]

export default function StatusFilter({ currentFilter, onFilterChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {OPTIONS.map((option) => (
        <Button
          key={option.value}
          size="sm"
          variant={currentFilter === option.value ? "default" : "outline"}
          className="rounded-full"
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}