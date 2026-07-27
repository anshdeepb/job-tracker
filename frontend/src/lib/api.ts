import type { Application } from "@/types/Application"

const BASE_URL = "http://localhost:8000"

export async function getApplications(): Promise<Application[]> {
  const res = await fetch(`${BASE_URL}/applications`)
  return res.json()
}

export async function addApplication(data: Omit<Application, "id">): Promise<Application> {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateApplication(id: number, data: Omit<Application, "id">): Promise<Application> {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}