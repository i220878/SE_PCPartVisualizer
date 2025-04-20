import type { Component } from "./types"

export const mockComponents: Component[] = [
  // CPUs
  {
    id: "cpu-1",
    name: "Ryzen 7 5800X",
    brand: "AMD",
    category: "cpu",
    specs: [
      { name: "Cores", value: "8" },
      { name: "Threads", value: "16" },
      { name: "Base Clock", value: "3.8 GHz" },
      { name: "Socket", value: "AM4" },
      { name: "TDP", value: "105W" },
    ],
    price: 299.99,
  },
  {
    id: "cpu-2",
    name: "Core i7-12700K",
    brand: "Intel",
    category: "cpu",
    specs: [
      { name: "Cores", value: "12 (8P+4E)" },
      { name: "Threads", value: "20" },
      { name: "Base Clock", value: "3.6 GHz" },
      { name: "Socket", value: "LGA1700" },
      { name: "TDP", value: "125W" },
    ],
    price: 379.99,
  },
  {
    id: "cpu-3",
    name: "Ryzen 5 5600X",
    brand: "AMD",
    category: "cpu",
    specs: [
      { name: "Cores", value: "6" },
      { name: "Threads", value: "12" },
      { name: "Base Clock", value: "3.7 GHz" },
      { name: "Socket", value: "AM4" },
      { name: "TDP", value: "65W" },
    ],
    price: 199.99,
  },
  {
    id: "cpu-4",
    name: "Core i5-12600K",
    brand: "Intel",
    category: "cpu",
    specs: [
      { name: "Cores", value: "10 (6P+4E)" },
      { name: "Threads", value: "16" },
      { name: "Base Clock", value: "3.7 GHz" },
      { name: "Socket", value: "LGA1700" },
      { name: "TDP", value: "125W" },
    ],
    price: 279.99,
  },

  // Motherboards
  {
    id: "mb-1",
    name: "B550 Tomahawk",
    brand: "MSI",
    category: "motherboard",
    specs: [
      { name: "Socket", value: "AM4" },
      { name: "Form Factor", value: "ATX" },
      { name: "Memory Slots", value: "4" },
      { name: "Max Memory", value: "128GB" },
      { name: "PCIe x16 Slots", value: "2" },
    ],
    price: 169.99,
  },
  {
    id: "mb-2",
    name: "Z690 Aorus Elite",
    brand: "Gigabyte",
    category: "motherboard",
    specs: [
      { name: "Socket", value: "LGA1700" },
      { name: "Form Factor", value: "ATX" },
      { name: "Memory Slots", value: "4" },
      { name: "Max Memory", value: "128GB" },
      { name: "PCIe x16 Slots", value: "2" },
    ],
    price: 249.99,
  },
  {
    id: "mb-3",
    name: "X570 Gaming Plus",
    brand: "MSI",
    category: "motherboard",
    specs: [
      { name: "Socket", value: "AM4" },
      { name: "Form Factor", value: "ATX" },
      { name: "Memory Slots", value: "4" },
      { name: "Max Memory", value: "128GB" },
      { name: "PCIe x16 Slots", value: "2" },
    ],
    price: 159.99,
  },
  {
    id: "mb-4",
    name: "B660 Gaming X",
    brand: "Gigabyte",
    category: "motherboard",
    specs: [
      { name: "Socket", value: "LGA1700" },
      { name: "Form Factor", value: "ATX" },
      { name: "Memory Slots", value: "4" },
      { name: "Max Memory", value: "128GB" },
      { name: "PCIe x16 Slots", value: "1" },
    ],
    price: 149.99,
  },

  // RAM
  {
    id: "ram-1",
    name: "Vengeance RGB Pro 32GB",
    brand: "Corsair",
    category: "ram",
    specs: [
      { name: "Capacity", value: "32GB (2x16GB)" },
      { name: "Type", value: "DDR4" },
      { name: "Speed", value: "3600MHz" },
      { name: "CAS Latency", value: "CL18" },
      { name: "Voltage", value: "1.35V" },
    ],
    price: 129.99,
  },
  {
    id: "ram-2",
    name: "Trident Z RGB 16GB",
    brand: "G.Skill",
    category: "ram",
    specs: [
      { name: "Capacity", value: "16GB (2x8GB)" },
      { name: "Type", value: "DDR4" },
      { name: "Speed", value: "3200MHz" },
      { name: "CAS Latency", value: "CL16" },
      { name: "Voltage", value: "1.35V" },
    ],
    price: 89.99,
  },
  {
    id: "ram-3",
    name: "Fury Beast 32GB",
    brand: "Kingston",
    category: "ram",
    specs: [
      { name: "Capacity", value: "32GB (2x16GB)" },
      { name: "Type", value: "DDR5" },
      { name: "Speed", value: "5200MHz" },
      { name: "CAS Latency", value: "CL40" },
      { name: "Voltage", value: "1.25V" },
    ],
    price: 169.99,
  },
  {
    id: "ram-4",
    name: "Dominator Platinum 32GB",
    brand: "Corsair",
    category: "ram",
    specs: [
      { name: "Capacity", value: "32GB (2x16GB)" },
      { name: "Type", value: "DDR5" },
      { name: "Speed", value: "5600MHz" },
      { name: "CAS Latency", value: "CL36" },
      { name: "Voltage", value: "1.25V" },
    ],
    price: 219.99,
  },

  // GPUs
  {
    id: "gpu-1",
    name: "GeForce RTX 3070",
    brand: "NVIDIA",
    category: "gpu",
    specs: [
      { name: "VRAM", value: "8GB GDDR6" },
      { name: "Boost Clock", value: "1.73 GHz" },
      { name: "CUDA Cores", value: "5888" },
      { name: "Power Connectors", value: "1x 12-pin" },
      { name: "TDP", value: "220W" },
    ],
    price: 599.99,
  },
  {
    id: "gpu-2",
    name: "Radeon RX 6800 XT",
    brand: "AMD",
    category: "gpu",
    specs: [
      { name: "VRAM", value: "16GB GDDR6" },
      { name: "Boost Clock", value: "2.25 GHz" },
      { name: "Stream Processors", value: "4608" },
      { name: "Power Connectors", value: "2x 8-pin" },
      { name: "TDP", value: "300W" },
    ],
    price: 649.99,
  },
  {
    id: "gpu-3",
    name: "GeForce RTX 3080",
    brand: "NVIDIA",
    category: "gpu",
    specs: [
      { name: "VRAM", value: "10GB GDDR6X" },
      { name: "Boost Clock", value: "1.71 GHz" },
      { name: "CUDA Cores", value: "8704" },
      { name: "Power Connectors", value: "2x 8-pin" },
      { name: "TDP", value: "320W" },
    ],
    price: 699.99,
  },
  {
    id: "gpu-4",
    name: "Radeon RX 6700 XT",
    brand: "AMD",
    category: "gpu",
    specs: [
      { name: "VRAM", value: "12GB GDDR6" },
      { name: "Boost Clock", value: "2.58 GHz" },
      { name: "Stream Processors", value: "2560" },
      { name: "Power Connectors", value: "1x 8-pin + 1x 6-pin" },
      { name: "TDP", value: "230W" },
    ],
    price: 479.99,
  },

  // Storage
  {
    id: "storage-1",
    name: "970 EVO Plus 1TB",
    brand: "Samsung",
    category: "storage",
    specs: [
      { name: "Capacity", value: "1TB" },
      { name: "Type", value: "NVMe SSD" },
      { name: "Read Speed", value: "3500 MB/s" },
      { name: "Write Speed", value: "3300 MB/s" },
      { name: "Form Factor", value: "M.2 2280" },
    ],
    price: 119.99,
  },
  {
    id: "storage-2",
    name: "Barracuda 2TB",
    brand: "Seagate",
    category: "storage",
    specs: [
      { name: "Capacity", value: "2TB" },
      { name: "Type", value: "HDD" },
      { name: "Speed", value: "7200 RPM" },
      { name: "Cache", value: "256MB" },
      { name: "Form Factor", value: '3.5"' },
    ],
    price: 54.99,
  },
  {
    id: "storage-3",
    name: "SN850 2TB",
    brand: "Western Digital",
    category: "storage",
    specs: [
      { name: "Capacity", value: "2TB" },
      { name: "Type", value: "NVMe SSD" },
      { name: "Read Speed", value: "7000 MB/s" },
      { name: "Write Speed", value: "5300 MB/s" },
      { name: "Form Factor", value: "M.2 2280" },
    ],
    price: 249.99,
  },
  {
    id: "storage-4",
    name: "MX500 1TB",
    brand: "Crucial",
    category: "storage",
    specs: [
      { name: "Capacity", value: "1TB" },
      { name: "Type", value: "SATA SSD" },
      { name: "Read Speed", value: "560 MB/s" },
      { name: "Write Speed", value: "510 MB/s" },
      { name: "Form Factor", value: '2.5"' },
    ],
    price: 89.99,
  },

  // PSUs
  {
    id: "psu-1",
    name: "RM750x",
    brand: "Corsair",
    category: "psu",
    specs: [
      { name: "Wattage", value: "750W" },
      { name: "Efficiency", value: "80+ Gold" },
      { name: "Modularity", value: "Fully Modular" },
      { name: "Fan Size", value: "135mm" },
      { name: "ATX Version", value: "2.4" },
    ],
    price: 129.99,
  },
  {
    id: "psu-2",
    name: "SuperNOVA 850 G5",
    brand: "EVGA",
    category: "psu",
    specs: [
      { name: "Wattage", value: "850W" },
      { name: "Efficiency", value: "80+ Gold" },
      { name: "Modularity", value: "Fully Modular" },
      { name: "Fan Size", value: "135mm" },
      { name: "ATX Version", value: "2.4" },
    ],
    price: 149.99,
  },
  {
    id: "psu-3",
    name: "Focus GX-650",
    brand: "Seasonic",
    category: "psu",
    specs: [
      { name: "Wattage", value: "650W" },
      { name: "Efficiency", value: "80+ Gold" },
      { name: "Modularity", value: "Fully Modular" },
      { name: "Fan Size", value: "120mm" },
      { name: "ATX Version", value: "2.4" },
    ],
    price: 109.99,
  },
  {
    id: "psu-4",
    name: "Toughpower GF1 750W",
    brand: "Thermaltake",
    category: "psu",
    specs: [
      { name: "Wattage", value: "750W" },
      { name: "Efficiency", value: "80+ Gold" },
      { name: "Modularity", value: "Fully Modular" },
      { name: "Fan Size", value: "140mm" },
      { name: "ATX Version", value: "2.4" },
    ],
    price: 119.99,
  },

  // Cases
  {
    id: "case-1",
    name: "4000D Airflow",
    brand: "Corsair",
    category: "case",
    specs: [
      { name: "Form Factor", value: "Mid Tower" },
      { name: "Motherboard Support", value: "ATX, mATX, Mini-ITX" },
      { name: "Drive Bays", value: '2x 3.5", 2x 2.5"' },
      { name: "Front I/O", value: "1x USB 3.1 Type-C, 1x USB 3.0, Audio" },
      { name: "Dimensions", value: "453 x 230 x 466 mm" },
    ],
    price: 94.99,
  },
  {
    id: "case-2",
    name: "H510",
    brand: "NZXT",
    category: "case",
    specs: [
      { name: "Form Factor", value: "Mid Tower" },
      { name: "Motherboard Support", value: "ATX, mATX, Mini-ITX" },
      { name: "Drive Bays", value: '3x 3.5", 2x 2.5"' },
      { name: "Front I/O", value: "1x USB 3.1 Type-C, 1x USB 3.0, Audio" },
      { name: "Dimensions", value: "428 x 210 x 460 mm" },
    ],
    price: 69.99,
  },
  {
    id: "case-3",
    name: "Meshify C",
    brand: "Fractal Design",
    category: "case",
    specs: [
      { name: "Form Factor", value: "Mid Tower" },
      { name: "Motherboard Support", value: "ATX, mATX, Mini-ITX" },
      { name: "Drive Bays", value: '2x 3.5", 3x 2.5"' },
      { name: "Front I/O", value: "2x USB 3.0, Audio" },
      { name: "Dimensions", value: "413 x 217 x 453 mm" },
    ],
    price: 89.99,
  },
  {
    id: "case-4",
    name: "Lancool II Mesh",
    brand: "Lian Li",
    category: "case",
    specs: [
      { name: "Form Factor", value: "Mid Tower" },
      { name: "Motherboard Support", value: "E-ATX, ATX, mATX, Mini-ITX" },
      { name: "Drive Bays", value: '3x 3.5", 4x 2.5"' },
      { name: "Front I/O", value: "2x USB 3.0, 1x USB 3.1 Type-C, Audio" },
      { name: "Dimensions", value: "478 x 229 x 494 mm" },
    ],
    price: 109.99,
  },
]

// Mock data for price comparisons
export const getPriceComparisons = (componentId: string) => {
  return [
    {
      retailer: "Amazon",
      price: Math.round((getComponentPrice(componentId) - 5 + Math.random() * 10) * 100) / 100,
      url: "https://amazon.com",
    },
    {
      retailer: "Newegg",
      price: Math.round((getComponentPrice(componentId) + Math.random() * 15) * 100) / 100,
      url: "https://newegg.com",
    },
    {
      retailer: "Best Buy",
      price: Math.round((getComponentPrice(componentId) + 10 - Math.random() * 10) * 100) / 100,
      url: "https://bestbuy.com",
    },
    {
      retailer: "Micro Center",
      price: Math.round((getComponentPrice(componentId) - 10 + Math.random() * 20) * 100) / 100,
      url: "https://microcenter.com",
    },
  ]
}

// Helper function to get component price
const getComponentPrice = (componentId: string) => {
  const component = mockComponents.find((c) => c.id === componentId)
  return component ? component.price : 100
}

// Mock data for build guides
export const mockBuildGuides = [
  {
    id: "guide-1",
    title: "Budget Gaming PC Build",
    description: "A budget-friendly gaming PC build that can handle most modern games at 1080p.",
    difficulty: "Beginner",
    estimatedTime: "2-3 hours",
    components: ["cpu-3", "mb-3", "ram-2", "gpu-4", "storage-4", "psu-3", "case-2"],
    author: "PCBuildPro",
    date: "2023-05-15",
    likes: 245,
    views: 12500,
  },
  {
    id: "guide-2",
    title: "High-End Gaming PC Build",
    description: "A high-end gaming PC build that can handle 4K gaming and content creation.",
    difficulty: "Intermediate",
    estimatedTime: "3-4 hours",
    components: ["cpu-2", "mb-2", "ram-1", "gpu-3", "storage-3", "psu-2", "case-4"],
    author: "TechGuru",
    date: "2023-06-22",
    likes: 378,
    views: 18900,
  },
  {
    id: "guide-3",
    title: "Compact Mini-ITX Build",
    description: "A compact Mini-ITX build that's perfect for small spaces.",
    difficulty: "Advanced",
    estimatedTime: "4-5 hours",
    components: ["cpu-1", "mb-1", "ram-3", "gpu-1", "storage-1", "psu-1", "case-1"],
    author: "SFFMaster",
    date: "2023-07-10",
    likes: 156,
    views: 8700,
  },
  {
    id: "guide-4",
    title: "Workstation Build for Content Creation",
    description: "A powerful workstation build for video editing, 3D rendering, and other content creation tasks.",
    difficulty: "Intermediate",
    estimatedTime: "3-4 hours",
    components: ["cpu-1", "mb-1", "ram-4", "gpu-2", "storage-3", "psu-2", "case-3"],
    author: "CreatorPro",
    date: "2023-08-05",
    likes: 210,
    views: 11200,
  },
]

// Mock data for user-submitted builds
export const mockUserBuilds = [
  {
    id: "build-1",
    title: "My First Gaming PC",
    description: "My first gaming PC build. It's not much, but it's mine!",
    components: ["cpu-3", "mb-3", "ram-2", "gpu-4", "storage-4", "psu-3", "case-2"],
    author: "GamerNewbie",
    date: "2023-06-10",
    likes: 45,
    comments: 12,
    images: ["/placeholder.svg?height=400&width=600"],
  },
  {
    id: "build-2",
    title: "Dream 4K Gaming Rig",
    description: "Finally built my dream 4K gaming rig. It's a beast!",
    components: ["cpu-2", "mb-2", "ram-1", "gpu-3", "storage-3", "psu-2", "case-4"],
    author: "4KGamer",
    date: "2023-07-15",
    likes: 87,
    comments: 24,
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
  {
    id: "build-3",
    title: "Compact Powerhouse",
    description: "A small form factor build that packs a punch.",
    components: ["cpu-1", "mb-1", "ram-3", "gpu-1", "storage-1", "psu-1", "case-1"],
    author: "SFFEnthusiast",
    date: "2023-08-20",
    likes: 62,
    comments: 18,
    images: ["/placeholder.svg?height=400&width=600"],
  },
  {
    id: "build-4",
    title: "Budget Streaming Setup",
    description: "A budget-friendly PC build for streaming and light gaming.",
    components: ["cpu-3", "mb-4", "ram-2", "gpu-4", "storage-2", "psu-3", "case-2"],
    author: "StreamerOnABudget",
    date: "2023-09-05",
    likes: 34,
    comments: 9,
    images: ["/placeholder.svg?height=400&width=600"],
  },
]

// Mock data for shipping estimates
export const getShippingEstimates = (componentId: string) => {
  return [
    {
      retailer: "Amazon",
      days: Math.floor(Math.random() * 3) + 1,
      price: Math.random() > 0.5 ? 0 : 4.99,
    },
    {
      retailer: "Newegg",
      days: Math.floor(Math.random() * 4) + 2,
      price: Math.random() > 0.3 ? 0 : 5.99,
    },
    {
      retailer: "Best Buy",
      days: Math.floor(Math.random() * 3) + 1,
      price: Math.random() > 0.7 ? 0 : 3.99,
    },
    {
      retailer: "Micro Center",
      days: Math.floor(Math.random() * 5) + 3,
      price: 7.99,
    },
  ]
}
