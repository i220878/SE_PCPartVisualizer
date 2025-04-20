import ProductCard from "./product-card"

// Mock data for components
const products = [
  {
    id: 1,
    name: "AMD Ryzen 7 5800X",
    category: "CPUs",
    price: 299.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "amd-ryzen-7-5800x",
  },
  {
    id: 2,
    name: "Intel Core i9-12900K",
    category: "CPUs",
    price: 589.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "intel-core-i9-12900k",
  },
  {
    id: 3,
    name: "NVIDIA GeForce RTX 3080",
    category: "Graphics Cards",
    price: 699.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "nvidia-geforce-rtx-3080",
  },
  {
    id: 4,
    name: "AMD Radeon RX 6800 XT",
    category: "Graphics Cards",
    price: 649.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "amd-radeon-rx-6800-xt",
  },
  {
    id: 5,
    name: "Corsair Vengeance RGB Pro 32GB",
    category: "Memory",
    price: 149.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "corsair-vengeance-rgb-pro-32gb",
  },
  {
    id: 6,
    name: "G.Skill Trident Z RGB 16GB",
    category: "Memory",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "gskill-trident-z-rgb-16gb",
  },
  {
    id: 7,
    name: "Samsung 970 EVO Plus 1TB",
    category: "Storage",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "samsung-970-evo-plus-1tb",
  },
  {
    id: 8,
    name: "WD Black SN850 2TB",
    category: "Storage",
    price: 229.99,
    image: "/placeholder.svg?height=200&width=200",
    slug: "wd-black-sn850-2tb",
  },
]

export default function Products() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          category={product.category}
          price={product.price}
          image={product.image}
          slug={product.slug}
        />
      ))}
    </div>
  )
}
