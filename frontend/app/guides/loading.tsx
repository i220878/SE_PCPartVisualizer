import { Skeleton } from "@/components/ui/skeleton"

export default function GuidesLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-8">
        <Skeleton className="h-10 w-[300px] mx-auto" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="pt-4">
                <Skeleton className="h-10 w-[120px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
