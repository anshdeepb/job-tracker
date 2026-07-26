import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import StatusBadge from "@/components/StatusBadge"

import type { Application } from "@/types/Application"

interface ApplicationTableProps {
    applications: Application[]
    onDelete: (id: number) => void
    onRowClick: (application : Application) => void
}

export default function ApplicationsTable({applications, onDelete, onRowClick} : ApplicationTableProps) {
    return(
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
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