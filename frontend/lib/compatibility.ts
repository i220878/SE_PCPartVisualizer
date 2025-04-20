import type { Component } from "./types"

export function checkCompatibility(components: Component[]): string[] {
  const issues: string[] = []

  // Get components by category
  const cpu = components.find((c) => c.category === "cpu")
  const motherboard = components.find((c) => c.category === "motherboard")
  const ram = components.find((c) => c.category === "ram")
  const gpu = components.find((c) => c.category === "gpu")
  const psu = components.find((c) => c.category === "psu")

  // Check CPU and Motherboard socket compatibility
  if (cpu && motherboard) {
    const cpuSocket = cpu.specs.find((spec) => spec.name === "Socket")?.value
    const mbSocket = motherboard.specs.find((spec) => spec.name === "Socket")?.value

    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
      issues.push(`CPU socket (${cpuSocket}) is not compatible with motherboard socket (${mbSocket}).`)
    }
  }

  // Check RAM and Motherboard compatibility
  if (ram && motherboard) {
    const ramType = ram.specs.find((spec) => spec.name === "Type")?.value

    // Simple check for DDR4 vs DDR5
    if (ramType === "DDR5" && motherboard.name.includes("B550")) {
      issues.push(`${ram.name} (DDR5) is not compatible with ${motherboard.name} which supports DDR4.`)
    }

    if (ramType === "DDR4" && motherboard.name.includes("Z690")) {
      issues.push(`${ram.name} (DDR4) may not be compatible with ${motherboard.name} which typically supports DDR5.`)
    }
  }

  // Check power requirements
  if (gpu && psu) {
    const gpuTDP = Number.parseInt(gpu.specs.find((spec) => spec.name === "TDP")?.value || "0")
    const psuWattage = Number.parseInt(psu.specs.find((spec) => spec.name === "Wattage")?.value || "0")

    // Simple check - assume GPU needs at least 2x its TDP in PSU wattage
    if (gpuTDP * 2 > psuWattage) {
      issues.push(`PSU wattage (${psuWattage}W) may be insufficient for GPU with TDP of ${gpuTDP}W.`)
    }
  }

  // Check total power requirements
  const totalTDP = components.reduce((total, component) => {
    const tdpSpec = component.specs.find((spec) => spec.name === "TDP")
    if (tdpSpec) {
      return total + Number.parseInt(tdpSpec.value)
    }
    return total
  }, 0)

  if (psu && totalTDP > 0) {
    const psuWattage = Number.parseInt(psu.specs.find((spec) => spec.name === "Wattage")?.value || "0")

    if (totalTDP > psuWattage * 0.8) {
      issues.push(
        `Total system power draw (${totalTDP}W) is approaching PSU capacity (${psuWattage}W). Consider a higher wattage PSU.`,
      )
    }
  }

  return issues
}
