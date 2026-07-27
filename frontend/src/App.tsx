import { useState } from 'react'
import './App.css'
import type { Application } from "@/types/Application"
import StatsBar from "@/components/StatsBar"
import Header from "@/components/Header"
import ApplicationsTable from './components/ApplicationTable'
import AddApplicationDialog from './components/AddApplicationDialog'
import ApplicationDetails from './components/ApplicationDetails'
import { useEffect } from 'react'
import { getApplications, addApplication, updateApplication, deleteApplication } from '@/lib/api'
import StatusFilter from "@/components/StatusFilter"

function App() {

  const [applications, setApplications] = useState<Application[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  const [statusFilter, setStatusFilter] = useState<Application["status"] | "all">("all")

  const filteredApplications =
  statusFilter === "all"
    ? applications
    : applications.filter((app) => app.status === statusFilter)

useEffect(() => {
  getApplications().then(setApplications)
}, [])



const handleAdd = async (newApplication: Application) => {
  const created = await addApplication(newApplication)
  setApplications((prev) => [...prev, created])
}

const handleDelete = async (id: number) => {
  await deleteApplication(id)
  setApplications((prev) => prev.filter((app) => app.id !== id))
}

const handleUpdate = async (updatedApplication: Application) => {
  const updated = await updateApplication(updatedApplication.id, updatedApplication)
  setApplications((prev) =>
    prev.map((app) => (app.id === updated.id ? updated : app))
  )
}

  return (
    <div className='min-h-screen bg-slate-50 px-6 py-8'>
      <Header onAddClick={() => setIsDialogOpen(true)} />
      <StatsBar applications={applications} />
      <AddApplicationDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAdd}
      />
      <ApplicationDetails
        key={selectedApplication?.id}
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
        onUpdate={handleUpdate}
      />
      <div className='mt-6'>
        <StatusFilter currentFilter={statusFilter} onFilterChange={setStatusFilter} />
        <ApplicationsTable
          applications={filteredApplications}
          onDelete={handleDelete}
          onRowClick={(app) => setSelectedApplication(app)}
        />
      </div>
    </div>
  )
}

export default App
