import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { Application } from "@/types/Application"

interface AddApplicationDialogProps {
    open: boolean
    onClose: () => void
    onAdd: (application: Application) => void
}

export default function AddApplicationDialog({open, onClose, onAdd} : AddApplicationDialogProps) {

  const [company, setCompany] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<Application["status"]>("applied")
  const [dateApplied, setDateApplied] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const resetForm = () => {
    setCompany("")
    setRole("")
    setSelectedStatus("applied")
    setDateApplied("")
    setUrl("")
    setNotes("")
  }

  const handleSubmit = () => {
    const newApplication: Application = {
      id: Date.now(),
      company,
      role,
      status: selectedStatus,
      dateApplied,
      url,
      notes,
    }
    onAdd(newApplication)
    resetForm()
    onClose()
  }

  return(
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription>
            Log a new application to track its progress.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className="mt-1"/>
            </div>
            <div>
              <Label htmlFor='role'>Role</Label>
              <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Software Engineer" className='mt-1'/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as Application["status"])}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select status" />
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
              <Label htmlFor="dateApplied">Date applied</Label>
              <Input
                id="dateApplied"
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="url">Job URL</Label>
            <Input id="url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="mt-1" />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Referral, interview prep, etc." className="mt-1" rows={2} />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add application</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}