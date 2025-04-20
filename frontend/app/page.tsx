import { Suspense } from "react"
import ComponentSearch from "@/components/component-search"
import BuildList from "@/components/build-list"
import SavedBuilds from "@/components/saved-builds"
import PCVisualizer from "@/components/pc-visualizer"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">PC Part Visualizer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<div>Loading component search...</div>}>
            <ComponentSearch />
          </Suspense>

          <PCVisualizer />
        </div>

        <div className="space-y-6">
          <BuildList />
          <SavedBuilds />
        </div>
      </div>
    </main>
  )
}
