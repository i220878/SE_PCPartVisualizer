export type ComponentCategory = "cpu" | "motherboard" | "ram" | "gpu" | "storage" | "psu" | "case"

export interface ComponentSpec {
  name: string
  value: string
}

export interface Component {
  id: string
  name: string
  brand: string
  category: ComponentCategory
  specs: ComponentSpec[]
  price: number
}

export interface RetailerPrice {
  retailer: string
  price: number
  url: string
}

export interface ComponentWithPrices extends Component {
  retailerPrices: RetailerPrice[]
}

export interface PCBuild {
  id: string
  name: string
  date: string
  components: Component[]
}
