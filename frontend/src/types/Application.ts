export interface Application {
    id: number
    company: string
    role: string
    status: "applied" | "interviewing" | "offer" | "rejected"
    dateApplied: string
    url?: string
    notes?: string
}