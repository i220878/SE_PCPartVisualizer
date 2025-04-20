import type { Component } from "./types"

// Calculate estimated power consumption for a build
export function calculatePowerConsumption(components: Component[]): number {
  let totalPower = 0

  // Base system power (motherboard, fans, etc.)
  totalPower += 50

  // Add power for each component
  components.forEach((component) => {
    switch (component.category) {
      case "cpu":
        // Get TDP from specs or estimate
        const cpuTdp = component.specs.find((spec) => spec.name === "TDP")
        if (cpuTdp) {
          totalPower += Number.parseInt(cpuTdp.value)
        } else {
          // Estimate based on CPU name
          if (component.name.includes("i9") || component.name.includes("Ryzen 9")) {
            totalPower += 125
          } else if (component.name.includes("i7") || component.name.includes("Ryzen 7")) {
            totalPower += 95
          } else {
            totalPower += 65
          }
        }
        break

      case "gpu":
        // Get TDP from specs or estimate
        const gpuTdp = component.specs.find((spec) => spec.name === "TDP")
        if (gpuTdp) {
          totalPower += Number.parseInt(gpuTdp.value)
        } else {
          // Estimate based on GPU name
          if (component.name.includes("3090") || component.name.includes("6900")) {
            totalPower += 350
          } else if (component.name.includes("3080") || component.name.includes("6800")) {
            totalPower += 320
          } else if (component.name.includes("3070") || component.name.includes("6700")) {
            totalPower += 220
          } else {
            totalPower += 150
          }
        }
        break

      case "ram":
        // Estimate RAM power consumption
        totalPower += 10
        break

      case "storage":
        // Estimate storage power consumption
        if (component.name.includes("HDD") || component.specs.some((spec) => spec.value.includes("HDD"))) {
          totalPower += 10
        } else {
          totalPower += 5
        }
        break

      default:
        break
    }
  })

  return totalPower
}

// Recommend a PSU based on power consumption
export function recommendPSU(powerConsumption: number): {
  wattage: number
  efficiency: string
  headroom: number
} {
  // Add 40% headroom for future upgrades and power spikes
  const recommendedWattage = Math.ceil((powerConsumption * 1.4) / 50) * 50

  // Determine efficiency rating based on power consumption
  let efficiency = "80+ Bronze"
  if (powerConsumption > 500) {
    efficiency = "80+ Gold"
  } else if (powerConsumption > 300) {
    efficiency = "80+ Silver"
  }

  return {
    wattage: recommendedWattage,
    efficiency,
    headroom: Math.round((recommendedWattage / powerConsumption - 1) * 100),
  }
}

// Filter PSUs based on power requirements
export function filterCompatiblePSUs(psus: Component[], powerConsumption: number): Component[] {
  return psus.filter((psu) => {
    const wattageSpec = psu.specs.find((spec) => spec.name === "Wattage")
    if (!wattageSpec) return false

    const wattage = Number.parseInt(wattageSpec.value)
    // PSU should have at least 20% headroom
    return wattage >= powerConsumption * 1.2
  })
}
