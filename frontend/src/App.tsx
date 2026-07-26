import { useState } from 'react'
import './App.css'
import type { Application } from "@/types/Application"
import StatsBar from "@/components/StatsBar"
import Header from "@/components/Header"
import ApplicationsTable from './components/ApplicationTable'
import AddApplicationDialog from './components/AddApplicationDialog'

// const mockApplications: Application[] = [
//   { id: 1, company: "Anthropic", role: "AI Engineer", status: "interviewing", dateApplied: "2026-07-10" },
//   { id: 2, company: "Vercel", role: "Frontend Engineer", status: "offer", dateApplied: "2026-06-15" },
//   { id: 3, company: "Notion", role: "Software Engineer", status: "applied", dateApplied: "2026-07-20" },
// ]

function App() {

  const [applications, setApplications] = useState<Application[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleAdd = (newApplication: Application) => {
  setApplications((prev) => [...prev, newApplication])
}

const handleDelete = (id: number) => {
  setApplications((prev) => prev.filter((app) => app.id !== id))
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
      <div className='mt-6'>
        <ApplicationsTable
          applications={applications}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default App
