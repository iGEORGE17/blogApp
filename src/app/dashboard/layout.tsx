import { DashboardNav } from "@/components/shared/DashboardNav"


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
        <div className="lg:flex lg:justify-between lg:items-stretch gap-3 lg:mx-10 lg:min-h-screen">
            <div className="relative border">
                <DashboardNav />
            </div>
            <div className="border lg:flex-1">
                {children}
            </div>
        </div>
    </section>
  )
}