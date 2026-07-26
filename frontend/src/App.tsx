//import { useState } from 'react'
import './App.css'
import type { Application } from "@/types/Application"
import StatsBar from "@/components/StatsBar"
import Header from "@/components/Header"
import ApplicationsTable from './components/ApplicationTable'

const mockApplications: Application[] = [
  { id: 1, company: "Anthropic", role: "AI Engineer", status: "interviewing", dateApplied: "2026-07-10" },
  { id: 2, company: "Vercel", role: "Frontend Engineer", status: "offer", dateApplied: "2026-06-15" },
  { id: 3, company: "Notion", role: "Software Engineer", status: "applied", dateApplied: "2026-07-20" },
]

function App() {
  return (
    <div className='min-h-screen bg-slate-50 px-6 py-8'>
      <Header onAddClick={() => console.log("clicked!")} />
      <StatsBar applications={mockApplications} />
      <div className='mt-6'>
        <ApplicationsTable 
          applications={mockApplications}
          onDelete={(id) => console.log("delete", id)}
        />
      </div>
    </div>
  )
}

export default App
