import { columns} from "./columns"
import { DataTable } from "./data-table"
import { Submission } from "@/types/index";
async function getData(): Promise<Submission[]> {
  return  [
    {
      id: "subm-001",
      supplier: "Paul Martin",
      email: "paul.martin@example.com",
      phone: "+237690112233",
      company: "AgroCam SARL",
      website: "https://agrocam.cm",
      productId: "prod-100",
      quantity: "500 kg",
      price: "1200",
      quality: "Premium",
      origin: "Cameroun",
      message: "Nous proposons du cacao de haute qualité, séché au soleil, prêt pour l’exportation.",
      certifications: "Fair Trade, Bio",
      // acceptTerms: true,
      createdAt: new Date("2025-09-01T10:20:00Z"),
      updatedAt: new Date("2025-09-01T10:20:00Z"),
    },
    {
      id: "subm-002",
      supplier: "Fatou Ndiaye",
      email: "fatou.ndiaye@example.com",
      phone: "+221771234567",
      company: "Sénégal Export",
      website: "",
      productId: "prod-101",
      quantity: "200 tonnes",
      price: "950",
      quality: "Standard",
      origin: "Sénégal",
      message: "Nos arachides sont disponibles pour livraison rapide, qualité contrôlée.",
      certifications: "ISO 22000",
      // acceptTerms: true,
      createdAt: new Date("2025-09-05T14:45:00Z"),
      updatedAt: new Date("2025-09-05T14:45:00Z"),
    },
    {
      id: "subm-003",
      supplier: "John Doe",
      email: "john.doe@example.com",
      phone: "+237678998877",
      company: "GreenFarm Ltd",
      website: "https://greenfarm.com",
      productId: "prod-102",
      quantity: "50 tonnes",
      price: "2500",
      quality: "Export",
      origin: "Nigeria",
      message: "Livraison rapide d’huile de palme rouge issue de plantations durables.",
      certifications: "",
      // acceptTerms: true,
      createdAt: new Date("2025-09-08T08:00:00Z"),
      updatedAt: new Date("2025-09-08T08:00:00Z"),
    },
    {
      id: "subm-004",
      supplier: "Maria Lopez",
      email: "maria.lopez@example.com",
      phone: "+34 612345678",
      company: "Lopez Trading",
      website: "https://lopez-trading.es",
      productId: "prod-103",
      quantity: "1000 sacs",
      price: "1800",
      quality: "Premium",
      origin: "Espagne",
      message: "Nous proposons des oranges biologiques, certifiées UE, conditionnées en sacs de 25 kg.",
      certifications: "EU Organic",
      // acceptTerms: true,
      createdAt: new Date("2025-09-10T18:15:00Z"),
      updatedAt: new Date("2025-09-10T18:15:00Z"),
    },
    {
      id: "subm-005",
      supplier: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      phone: "+20 1012345678",
      company: "Nile Cotton Co.",
      website: "",
      productId: "prod-104",
      quantity: "300 balles",
      price: "3000",
      quality: "Extra-long staple",
      origin: "Égypte",
      message: "Coton égyptien de haute qualité, idéal pour l’industrie textile.",
      certifications: "OEKO-TEX",
      // acceptTerms: true,
      createdAt: new Date("2025-09-12T12:30:00Z"),
      updatedAt: new Date("2025-09-12T12:30:00Z"),
    }
  ];
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}