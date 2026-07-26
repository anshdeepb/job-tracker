import { useState } from 'react'
import './App.css'
import type { Application } from "@/types/Application"
import StatsBar from "@/components/StatsBar"
import Header from "@/components/Header"
import ApplicationsTable from './components/ApplicationTable'
import AddApplicationDialog from './components/AddApplicationDialog'
import ApplicationDetails from './components/ApplicationDetails'

function App() {

  const [applications, setApplications] = useState<Application[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)



  const handleAdd = (newApplication: Application) => {
  setApplications((prev) => [...prev, newApplication])
}

const handleDelete = (id: number) => {
  setApplications((prev) => prev.filter((app) => app.id !== id))
}

const handleUpdate = (updatedApplication: Application) => {
  setApplications((prev) =>
    prev.map((app) => (app.id === updatedApplication.id ? updatedApplication : app))
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
        <ApplicationsTable
          applications={applications}
          onDelete={handleDelete}
          onRowClick={(app) => setSelectedApplication(app)}
        />
      </div>
    </div>
  )
}

export default App
