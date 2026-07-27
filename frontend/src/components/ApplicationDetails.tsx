import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { Application } from "@/types/Application"
import { Textarea } from "@/components/ui/textarea"

interface ApplicationDetailsProps {
  application: Application | null
  onClose: () => void
  onUpdate: (application: Application) => void
}

export default function ApplicationDetails({ application, onClose, onUpdate }: ApplicationDetailsProps) {
  if (!application) return null

  return (
    <ApplicationDetailsContent
      application={application}
      onClose={onClose}
      onUpdate={onUpdate}
    />
  )
}

function ApplicationDetailsContent({
  application,
  onClose,
  onUpdate,
}: {
  application: Application
  onClose: () => void
  onUpdate: (application: Application) => void
}) {
  const [selectedStatus, setSelectedStatus] = useState<Application["status"]>(application.status)
  const [notes, setNotes] = useState<string>(application.notes ?? "")

  const handleUpdate = () => {
    const updated: Application = { ...application, status: selectedStatus, notes: notes}
    onUpdate(updated)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{application.company}</DialogTitle>
          <DialogDescription>{application.role}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Company</p>
              <p className="text-sm font-medium">{application.company}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="text-sm font-medium">{application.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as Application["status"])}>
                <SelectTrigger id="status" className="mt-1 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date applied</p>
              <p className="text-sm font-medium">{application.dateApplied || "—"}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Job URL</p>
            {application.url ? (
            <a
                href={application.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 hover:underline break-all"
            >{application.url}</a>
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Notes</p>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Referral, interview prep, etc." className="mt-1 h-24 overflow-y-auto resize-none" rows={2} />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={handleUpdate}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}