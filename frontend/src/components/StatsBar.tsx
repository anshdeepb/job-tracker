import { Card, CardContent } from "@/components/ui/card"
import type { Application } from "@/types/Application"

interface StatsBarProps {
    applications: Application[]
}

export default function StatsBar({ applications } : StatsBarProps){

    const total = applications.length
    const interviewing = applications.filter(a => a.status == "interviewing").length
    const offers = applications.filter(a => a.status == "offer").length
    const responded = applications.filter(a => a.status !== "applied").length
    const responseRate = total ? Math.round((responded / total) * 100) : 0

    const stats = [
        {label: "Total Applications", value: total},
        {label: "Interviewing", value: interviewing},
        {label: "Offers", value: offers},
        {label: "Response rate", value: responseRate}
    ]

    return(
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(stat => (
                <Card key={stat.label}>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-semibold">{stat.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}