import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface HeaderProps {
  onAddClick: () => void
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Job applications</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Track every application in one place
        </p>
      </div>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4" />
        Add application
      </Button>
    </div>
  )
}