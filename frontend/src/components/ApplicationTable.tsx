import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Trash2, ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react"
import StatusBadge from "@/components/StatusBadge"

import type { Application } from "@/types/Application"

interface ApplicationTableProps {
    applications: Application[]
    onDelete: (id: number) => void
    onRowClick: (application : Application) => void
    onSortToggle: () => void
    sortOrder: "asc" | "desc" | null
}

export default function ApplicationsTable({applications, onDelete, onRowClick, onSortToggle, sortOrder} : ApplicationTableProps) {
    return(
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead onClick={onSortToggle} className="cursor-pointer select-none">
                    <div className="flex items-center gap-1">
                        Date Applied
                        {sortOrder === "asc" && <ArrowUp className="h-3.5 w-3.5" />}
                        {sortOrder === "desc" && <ArrowDown className="h-3.5 w-3.5" />}
                        {sortOrder === null && <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applications.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No applications yet.
                        </TableCell>
                    </TableRow>
                )}
                {applications.map((app) => (
                    <TableRow key={app.id} onClick={() => onRowClick(app)}>
                        <TableCell className="font-medium">{app.company}</TableCell>
                        <TableCell>{app.role}</TableCell>
                        <TableCell><StatusBadge status={app.status} /></TableCell>
                        <TableCell>{app.dateApplied}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onDelete(app.id) }}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}