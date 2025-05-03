"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Html } from "@react-three/drei"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  Maximize,
  Minimize,
  RotateCw,
  Eye,
  EyeOff,
  Layers,
  Download,
  Share2,
  Palette,
  Lightbulb,
} from "lucide-react"
import { useBuildStore } from "@/lib/store"
import { checkCompatibility } from "@/lib/compatibility"
import { exportBuildToPDF } from "@/lib/export-pdf"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { HexColorPicker } from "react-colorful"

export default function PCVisualizer() {
  const { currentBuild } = useBuildStore()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showLabels, setShowLabels] = useState(true)
  const [explodedView, setExplodedView] = useState(false)
  const [sidePanel, setSidePanel] = useState<"left" | "right" | "none">("right")
  const [lightingEnabled, setLightingEnabled] = useState(false)
  const [lightingColor, setLightingColor] = useState("#ff0000")
  const [lightingIntensity, setLightingIntensity] = useState(50)
  const { toast } = useToast()
  const compatibilityIssues = checkCompatibility(currentBuild.components)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleLabels = () => {
    setShowLabels(!showLabels)
  }

  const toggleExplodedView = () => {
    setExplodedView(!explodedView)
  }

  const handleExportPDF = () => {
    if (currentBuild.components.length === 0) {
      toast({
        title: "No components selected",
        description: "Add components to your build before exporting",
        variant: "destructive",
      })
      return
    }

    exportBuildToPDF(currentBuild)
    toast({
      title: "PDF Exported",
      description: "Your build has been exported as a PDF",
    })
  }

  const handleShareBuild = async () => {
    if (currentBuild.components.length === 0) {
      toast({
        title: "No components selected",
        description: "Add components to your build before sharing",
        variant: "destructive",
      })
      return
    }

    try {
      // Get the build ID or use 'current' as default
      const buildId = currentBuild.id || 'current'
      
      // If buildId is 'current', we'll need to include the build data in the request
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: buildId === 'current' ? JSON.stringify({
          name: currentBuild.name || 'Untitled Build',
          components: currentBuild.components,
          description: 'A PC build created with PC Part Visualizer'
        }) : undefined
      }
      
      // Call the API to share the build
      const response = await fetch(`/api/builds/${buildId}/share`, requestOptions)
      
      if (!response.ok) {
        throw new Error('Failed to share build')
      }
      
      const data = await response.json()
      
      // Generate shareable URL from the response
      const baseUrl = window.location.origin
      const shareUrl = `${baseUrl}${data.shareableUrl}`
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl)
      
      toast({
        title: "Link Copied",
        description: "Shareable link copied to clipboard",
      })
    } catch (error) {
      console.error("Failed to generate shareable link:", error)
      toast({
        title: "Error",
        description: "Failed to generate shareable link",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className={`w-full ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>3D Visualizer</CardTitle>
          <CardDescription>
            {currentBuild.components.length === 0
              ? "Add components to visualize your build"
              : "Rotate and zoom to inspect your build"}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" title="Customize lighting">
                <Lightbulb className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Customize Lighting</DialogTitle>
                <DialogDescription>Adjust RGB lighting settings for your PC build</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <span>Enable RGB Lighting</span>
                  <Button
                    variant={lightingEnabled ? "default" : "outline"}
                    onClick={() => setLightingEnabled(!lightingEnabled)}
                  >
                    {lightingEnabled ? "On" : "Off"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Lighting Color</label>
                  <HexColorPicker color={lightingColor} onChange={setLightingColor} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Intensity</label>
                    <span className="text-sm">{lightingIntensity}%</span>
                  </div>
                  <Slider
                    value={[lightingIntensity]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setLightingIntensity(value[0])}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" title="Case options">
                <Palette className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Case Options</DialogTitle>
                <DialogDescription>Customize your PC case view</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="panels" className="py-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="panels">Side Panels</TabsTrigger>
                  <TabsTrigger value="view">View Options</TabsTrigger>
                </TabsList>
                <TabsContent value="panels" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Side Panel</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={sidePanel === "left" ? "default" : "outline"}
                        onClick={() => setSidePanel("left")}
                        className="h-20"
                      >
                        Left Panel
                      </Button>
                      <Button
                        variant={sidePanel === "none" ? "default" : "outline"}
                        onClick={() => setSidePanel("none")}
                        className="h-20"
                      >
                        No Panels
                      </Button>
                      <Button
                        variant={sidePanel === "right" ? "default" : "outline"}
                        onClick={() => setSidePanel("right")}
                        className="h-20"
                      >
                        Right Panel
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="view" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <span>Exploded View</span>
                    <Button variant={explodedView ? "default" : "outline"} onClick={toggleExplodedView}>
                      {explodedView ? "On" : "Off"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Component Labels</span>
                    <Button variant={showLabels ? "default" : "outline"} onClick={toggleLabels}>
                      {showLabels ? "On" : "Off"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleLabels}
            title={showLabels ? "Hide labels" : "Show labels"}
          >
            {showLabels ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleExplodedView}
            title={explodedView ? "Compact view" : "Exploded view"}
          >
            <Layers className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className={`p-0 ${isFullscreen ? "h-[calc(100vh-4rem)]" : "h-[500px]"}`}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Environment preset="studio" />

          <DetailedPCCase
            hasComponents={currentBuild.components.length > 0}
            compatibilityIssues={compatibilityIssues}
            showLabels={showLabels}
            explodedView={explodedView}
            components={currentBuild.components}
            sidePanel={sidePanel}
            lightingEnabled={lightingEnabled}
            lightingColor={lightingColor}
            lightingIntensity={lightingIntensity / 100}
          />

          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={10} />
        </Canvas>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={currentBuild.components.length === 0}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareBuild}
            disabled={currentBuild.components.length === 0}
          >
            <Share2 className="mr-2 h-4 w-4" /> Share Build
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function DetailedPCCase({
  hasComponents,
  compatibilityIssues,
  showLabels,
  explodedView,
  components,
  sidePanel,
  lightingEnabled,
  lightingColor,
  lightingIntensity,
}) {
  const groupRef = useRef()
  const hasIssues = compatibilityIssues.length > 0
  const { viewport, gl } = useThree()

  // Slowly rotate the entire PC
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2
    }
  })

  // Calculate component positions based on exploded view
  const positions = {
    case: [0, 0, 0],
    motherboard: [0, 0, explodedView ? 0.3 : 0.2],
    cpu: [0, 0.7, explodedView ? 0.8 : 0.3],
    gpu: [0, -0.3, explodedView ? 0.8 : 0.3],
    ram: [0.5, 0.3, explodedView ? 0.8 : 0.3],
    psu: [0, -1.2, explodedView ? 0.8 : 0.3],
    storage: [-0.6, 0.3, explodedView ? 0.8 : 0.3],
    fans: [0, 0, explodedView ? -0.5 : -0.4],
  }

  // Get component details for labels
  const getComponentName = (category) => {
    const component = components.find((c) => c.category === category)
    return component ? component.name : category.toUpperCase()
  }

  const hasCPU = components.some((c) => c.category === "cpu");
  const hasGPU = components.some((c) => c.category === "gpu");
  const hasRAM = components.some((c) => c.category === "ram");
  const hasPSU = components.some((c) => c.category === "psu");
  const hasStorage = components.some((c) => c.category === "storage");
  const hasMotherboard = components.some((c) => c.category === "motherboard");


  // Create RGB lighting
  const rgbLightRef = useRef()
  useFrame((state) => {
    if (rgbLightRef.current && lightingEnabled) {
      rgbLightRef.current.intensity = lightingIntensity
    }
  })

  return (
    <group ref={groupRef}>
      {/* PC Case */}
      <mesh receiveShadow castShadow position={positions.case}>
        <boxGeometry args={[2.2, 3.2, 1.2]} />
        <meshStandardMaterial
          color={hasIssues ? "#fda4af" : "#e2e8f0"}
          transparent
          opacity={0.4}
          metalness={0.6}
          roughness={0.2}
        />

        {/* Case frame */}
        <mesh>
          <boxGeometry args={[2.22, 3.22, 1.22]} />
          <meshStandardMaterial color="#1e293b" wireframe={true} transparent opacity={0.7} />
        </mesh>

        {/* Front panel with mesh */}
        <mesh position={[0, 0, 0.61]}>
          <planeGeometry args={[2, 3]} />
          <meshStandardMaterial color="#1e293b" transparent opacity={0.9} />

          {/* Front mesh pattern */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[1.8, 1.2]} />
            <meshStandardMaterial color="#334155" wireframe={true} transparent opacity={0.7} />
          </mesh>

          {/* Power button */}
          <mesh position={[0, 1.4, 0.01]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* USB ports */}
          <group position={[0, 1.2, 0.01]}>
            <mesh position={[-0.15, 0, 0]}>
              <boxGeometry args={[0.06, 0.02, 0.01]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.15, 0, 0]}>
              <boxGeometry args={[0.06, 0.02, 0.01]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        </mesh>

        {/* Side panel (tempered glass) - configurable */}
        {sidePanel === "right" && (
          <mesh position={[1.11, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1.2, 3]} />
            <meshPhysicalMaterial
              color="#94a3b8"
              transparent
              opacity={0.3}
              metalness={0.9}
              roughness={0}
              transmission={0.9}
              thickness={0.05}
            />
          </mesh>
        )}

        {/* Left side panel - configurable */}
        {sidePanel === "left" && (
          <mesh position={[-1.11, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[1.2, 3]} />
            <meshPhysicalMaterial
              color="#94a3b8"
              transparent
              opacity={0.3}
              metalness={0.9}
              roughness={0}
              transmission={0.9}
              thickness={0.05}
            />
          </mesh>
        )}

        {/* RGB Lighting */}
        {lightingEnabled && (
          <pointLight
            ref={rgbLightRef}
            position={[0, 0, 0]}
            intensity={lightingIntensity}
            distance={3}
            color={lightingColor}
          />
        )}

        {/* Components inside */}
        {hasComponents && (
          <>
            {/* Motherboard */}
            {hasMotherboard && (
              <mesh position={positions.motherboard} receiveShadow castShadow>
                <boxGeometry args={[1.7, 2.4, 0.1]} />
                <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.8} />

                {/* Motherboard details */}
                <group>
                  {/* CPU socket */}
                  <mesh position={[0, 0.7, 0.051]}>
                    <boxGeometry args={[0.52, 0.52, 0.001]} />
                    <meshStandardMaterial color="#1e293b" />
                  </mesh>

                  {/* RAM slots */}
                  <group position={[0.5, 0.3, 0.051]}>
                    <mesh position={[0, 0.15, 0]}>
                      <boxGeometry args={[0.1, 0.2, 0.001]} />
                      <meshStandardMaterial color="#1e293b" />
                    </mesh>
                    <mesh position={[0, -0.15, 0]}>
                      <boxGeometry args={[0.1, 0.2, 0.001]} />
                      <meshStandardMaterial color="#1e293b" />
                    </mesh>
                  </group>

                  {/* PCIe slots */}
                  <group position={[0, -0.3, 0.051]}>
                    <mesh position={[0, 0, 0]}>
                      <boxGeometry args={[1.4, 0.1, 0.001]} />
                      <meshStandardMaterial color="#1e293b" />
                    </mesh>
                    <mesh position={[0, -0.2, 0]}>
                      <boxGeometry args={[1.4, 0.1, 0.001]} />
                      <meshStandardMaterial color="#1e293b" />
                    </mesh>
                  </group>

                  {/* SATA ports */}
                  <group position={[-0.6, 0.3, 0.051]}>
                    <mesh position={[0, 0.1, 0]}>
                      <boxGeometry args={[0.3, 0.05, 0.001]} />
                      <meshStandardMaterial color="#ef4444" />
                    </mesh>
                    <mesh position={[0, 0, 0]}>
                      <boxGeometry args={[0.3, 0.05, 0.001]} />
                      <meshStandardMaterial color="#ef4444" />
                    </mesh>
                    <mesh position={[0, -0.1, 0]}>
                      <boxGeometry args={[0.3, 0.05, 0.001]} />
                      <meshStandardMaterial color="#ef4444" />
                    </mesh>
                  </group>

                  {/* I/O shield */}
                  <mesh position={[-0.8, 0.7, 0]}>
                    <boxGeometry args={[0.1, 1, 0.1]} />
                    <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} />
                  </mesh>
                </group>
              </mesh>
            )}

            {/* CPU */}
            {hasCPU && (
              <mesh position={positions.cpu} receiveShadow castShadow>
                <boxGeometry args={[0.5, 0.5, 0.05]} />
                <meshStandardMaterial color={hasIssues ? "#ef4444" : "#64748b"} metalness={0.8} roughness={0.2} />

                {/* CPU cooler */}
                <group>
                  <mesh position={[0, 0, 0.1]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.1, 16]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
                  </mesh>
                  <mesh position={[0, 0, 0.2]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
                    <meshStandardMaterial color="#64748b" />
                  </mesh>
                  <mesh position={[0, 0, 0.3]}>
                    <boxGeometry args={[0.4, 0.4, 0.02]} />
                    <meshStandardMaterial color="#94a3b8" />
                  </mesh>
                </group>
              </mesh>
            )}

            {/* GPU */}
            {hasGPU && (
              <mesh position={positions.gpu} receiveShadow castShadow>
                <boxGeometry args={[1.6, 0.4, 0.1]} />
                <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />

                {/* GPU details */}
                <group>
                  <mesh position={[0, 0, 0.051]}>
                    <boxGeometry args={[1.4, 0.3, 0.001]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
                  </mesh>

                  {/* GPU fans */}
                  <group>
                    <mesh position={[-0.5, 0, 0.1]}>
                      <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
                      <meshStandardMaterial color="#64748b" />
                    </mesh>
                    <mesh position={[0, 0, 0.1]}>
                      <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
                      <meshStandardMaterial color="#64748b" />
                    </mesh>
                    <mesh position={[0.5, 0, 0.1]}>
                      <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
                      <meshStandardMaterial color="#64748b" />
                    </mesh>
                  </group>

                  {/* Display ports */}
                  <group position={[-0.7, 0, -0.051]}>
                    <mesh position={[0, 0.05, 0]}>
                      <boxGeometry args={[0.1, 0.03, 0.001]} />
                      <meshStandardMaterial color="#000000" />
                    </mesh>
                    <mesh position={[0, -0.05, 0]}>
                      <boxGeometry args={[0.1, 0.03, 0.001]} />
                      <meshStandardMaterial color="#000000" />
                    </mesh>
                  </group>
                </group>
              </mesh>
            )}

            {/* RAM */}
            {hasRAM && (
              <group position={positions.ram}>
                <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
                  <boxGeometry args={[0.1, 0.4, 0.2]} />
                  <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />

                  {/* RAM heatsink pattern */}
                  <mesh position={[0.051, 0, 0]}>
                    <boxGeometry args={[0.001, 0.38, 0.18]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                  </mesh>
                </mesh>

                <mesh position={[0, -0.25, 0]} receiveShadow castShadow>
                  <boxGeometry args={[0.1, 0.4, 0.2]} />
                  <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />

                  {/* RAM heatsink pattern */}
                  <mesh position={[0.051, 0, 0]}>
                    <boxGeometry args={[0.001, 0.38, 0.18]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                  </mesh>
                </mesh>
              </group>
            )}

            {/* PSU */}
            {hasPSU &&(
              <mesh position={positions.psu} receiveShadow castShadow>
                <boxGeometry args={[1.4, 0.6, 0.6]} />
                <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />

                {/* PSU details */}
                <group>
                  <mesh position={[0, 0, 0.301]}>
                    <planeGeometry args={[1.3, 0.5]} />
                    <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
                  </mesh>

                  {/* PSU fan */}
                  <mesh position={[0, 0, 0.302]} rotation={[0, 0, Math.PI / 4]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.001, 16]} />
                    <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
                  </mesh>

                  {/* Power cable */}
                  <mesh position={[-0.65, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
                    <meshStandardMaterial color="#000000" />
                  </mesh>
                </group>
              </mesh>
            )}

            {/* Storage */}
            {hasStorage && (
              <group position={positions.storage}>
                {/* SSD */}
                <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
                  <boxGeometry args={[0.35, 0.25, 0.05]} />
                  <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />

                  {/* SSD label */}
                  <mesh position={[0, 0, 0.026]}>
                    <planeGeometry args={[0.3, 0.2]} />
                    <meshStandardMaterial color="#1e293b" />
                  </mesh>
                </mesh>

                {/* HDD */}
                <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
                  <boxGeometry args={[0.35, 0.25, 0.1]} />
                  <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} />

                  {/* HDD label */}
                  <mesh position={[0, 0, 0.051]}>
                    <planeGeometry args={[0.3, 0.2]} />
                    <meshStandardMaterial color="#334155" />
                  </mesh>
                </mesh>
              </group>
            )}

            {/* Case fans */}
            <group position={positions.fans}>
              {/* Rear fan */}
              <group position={[-0.9, 0.7, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
                  <meshStandardMaterial color="#1e293b" transparent opacity={0.7} />
                </mesh>
                <mesh rotation={[0, 0, (state) => Math.sin(state.clock.getElapsedTime() * 5)]}>
                  <torusGeometry args={[0.2, 0.02, 16, 100]} />
                  <meshStandardMaterial color="#64748b" />
                </mesh>
                <mesh>
                  <sphereGeometry args={[0.05, 16, 16]} />
                  <meshStandardMaterial color="#94a3b8" />
                </mesh>
              </group>

              {/* Front fans */}
              <group position={[0, 0, -0.5]}>
                <group position={[0, 0.7, 0]}>
                  <mesh>
                    <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
                    <meshStandardMaterial color="#1e293b" transparent opacity={0.7} />
                  </mesh>
                  <mesh rotation={[0, 0, (state) => Math.sin(state.clock.getElapsedTime() * 5)]}>
                    <torusGeometry args={[0.2, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#64748b" />
                  </mesh>
                  <mesh>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial color="#94a3b8" />
                  </mesh>
                </group>

                <group position={[0, 0, 0]}>
                  <mesh>
                    <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
                    <meshStandardMaterial color="#1e293b" transparent opacity={0.7} />
                  </mesh>
                  <mesh rotation={[0, 0, (state) => Math.sin(state.clock.getElapsedTime() * 5)]}>
                    <torusGeometry args={[0.2, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#64748b" />
                  </mesh>
                  <mesh>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial color="#94a3b8" />
                  </mesh>
                </group>

                <group position={[0, -0.7, 0]}>
                  <mesh>
                    <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
                    <meshStandardMaterial color="#1e293b" transparent opacity={0.7} />
                  </mesh>
                  <mesh rotation={[0, 0, (state) => Math.sin(state.clock.getElapsedTime() * 5)]}>
                    <torusGeometry args={[0.2, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#64748b" />
                  </mesh>
                  <mesh>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial color="#94a3b8" />
                  </mesh>
                </group>
              </group>
            </group>

            {/* Component labels */}
            {showLabels && (
            <>
              {components.find((c) => c.category === "cpu") && (
                <Html position={[positions.cpu[0], positions.cpu[1], positions.cpu[2] + 0.5]} center>
                  <Badge variant={hasIssues ? "destructive" : "secondary"} className="text-xs whitespace-nowrap">
                    CPU: {getComponentName("cpu")}
                  </Badge>
                </Html>
              )}

              {components.find((c) => c.category === "gpu") && (
                <Html position={[positions.gpu[0], positions.gpu[1], positions.gpu[2] + 0.3]} center>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    GPU: {getComponentName("gpu")}
                  </Badge>
                </Html>
              )}

              {components.find((c) => c.category === "ram") && (
                <Html position={[positions.ram[0], positions.ram[1], positions.ram[2] + 0.3]} center>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    RAM: {getComponentName("ram")}
                  </Badge>
                </Html>
              )}

              {components.find((c) => c.category === "psu") && (
                <Html position={[positions.psu[0], positions.psu[1], positions.psu[2] + 0.4]} center>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    PSU: {getComponentName("psu")}
                  </Badge>
                </Html>
              )}

              {components.find((c) => c.category === "storage") && (
                <Html position={[positions.storage[0], positions.storage[1], positions.storage[2] + 0.3]} center>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    Storage: {getComponentName("storage")}
                  </Badge>
                </Html>
              )}

              {components.find((c) => c.category === "motherboard") && (
                <Html
                  position={[positions.motherboard[0], positions.motherboard[1] - 1, positions.motherboard[2] + 0.2]}
                  center
                >
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    Motherboard: {getComponentName("motherboard")}
                  </Badge>
                </Html>
              )}

              {components.find((c) => c.category === "case") && (
                <Html position={[positions.case[0], positions.case[1] + 1.7, positions.case[2]]} center>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    Case: {getComponentName("case")}
                  </Badge>
                </Html>
              )}
            </>
          )}
          </>
        )}
      </mesh>

      {/* Controls hint */}
      <Html position={[0, -2, 0]} center>
        <div className="bg-background/80 text-foreground px-2 py-1 rounded text-xs flex items-center">
          <RotateCw className="h-3 w-3 mr-1" /> Drag to rotate, scroll to zoom
        </div>
      </Html>
    </group>
  )
}
