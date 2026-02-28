export interface CalculatorItem {
  id: string;
  nameEs: string;
  nameEn: string;
  price: number;
  category: string;
}

export const upholsteryItems: CalculatorItem[] = [
  { id: "sofa-2", nameEs: "Sofá 2 Plazas", nameEn: "2-Seater Sofa", price: 69, category: "sofas" },
  { id: "sofa-2-chaise", nameEs: "Sofá 2 Plazas Chaiselongue", nameEn: "2-Seater Sofa w/ Chaise", price: 85, category: "sofas" },
  { id: "sofa-3", nameEs: "Sofá 3 Plazas", nameEn: "3-Seater Sofa", price: 79, category: "sofas" },
  { id: "sofa-3-chaise", nameEs: "Sofá 3 Plazas Chaiselongue", nameEn: "3-Seater Sofa w/ Chaise", price: 95, category: "sofas" },
  { id: "sofa-4", nameEs: "Sofá 4 Plazas", nameEn: "4-Seater Sofa", price: 99, category: "sofas" },
  { id: "sofa-5", nameEs: "Sofá 5 Plazas", nameEn: "5-Seater Sofa", price: 119, category: "sofas" },
  { id: "corner-sofa", nameEs: "Rinconera 5+ Plazas", nameEn: "Corner Sofa 5+ Seats", price: 139, category: "sofas" },

  { id: "mattress-single", nameEs: "Colchón Individual (80-90cm)", nameEn: "Single Mattress (80-90cm)", price: 50, category: "mattresses" },
  { id: "mattress-double", nameEs: "Colchón Doble (135-140cm)", nameEn: "Double Mattress (135-140cm)", price: 60, category: "mattresses" },
  { id: "mattress-king", nameEs: "Colchón King (150-160cm)", nameEn: "King Mattress (150-160cm)", price: 70, category: "mattresses" },
  { id: "mattress-superking", nameEs: "Colchón Super King (180-200cm)", nameEn: "Super King Mattress (180-200cm)", price: 80, category: "mattresses" },

  { id: "chair-seat", nameEs: "Silla (Solo Asiento)", nameEn: "Chair (Seat Only)", price: 8, category: "chairs" },
  { id: "chair-full", nameEs: "Silla Completa", nameEn: "Full Chair", price: 15, category: "chairs" },
  { id: "armchair", nameEs: "Sillón", nameEn: "Armchair", price: 35, category: "chairs" },
  { id: "puf", nameEs: "Puf", nameEn: "Pouf", price: 20, category: "chairs" },

  { id: "carpet-short", nameEs: "Alfombra Pelo Corto (m²)", nameEn: "Short Pile Carpet (m²)", price: 12, category: "carpets" },
  { id: "carpet-medium", nameEs: "Alfombra Pelo Medio (m²)", nameEn: "Medium Pile Carpet (m²)", price: 15, category: "carpets" },
  { id: "carpet-long", nameEs: "Alfombra Pelo Largo (m²)", nameEn: "Long Pile Carpet (m²)", price: 18, category: "carpets" },

  { id: "headboard", nameEs: "Cabecero", nameEn: "Headboard", price: 30, category: "other" },
  { id: "bed-frame", nameEs: "Estructura de Cama", nameEn: "Bed Frame", price: 25, category: "other" },
  { id: "ottoman", nameEs: "Canapé", nameEn: "Ottoman", price: 35, category: "other" },
];

export const carDetailingItems: CalculatorItem[] = [
  { id: "basic-wash", nameEs: "Lavado Básico", nameEn: "Basic Wash", price: 30, category: "packages" },
  { id: "interior-detail", nameEs: "Detailing Interior", nameEn: "Interior Detail", price: 80, category: "packages" },
  { id: "full-detail", nameEs: "Detailing Completo", nameEn: "Full Detail", price: 150, category: "packages" },
  { id: "premium-ceramic", nameEs: "Premium / Cerámico", nameEn: "Premium / Ceramic", price: 300, category: "packages" },

  { id: "engine-clean", nameEs: "Limpieza de Motor", nameEn: "Engine Cleaning", price: 40, category: "addons" },
  { id: "headlight-restore", nameEs: "Restauración de Faros", nameEn: "Headlight Restoration", price: 35, category: "addons" },
  { id: "odor-removal", nameEs: "Eliminación de Olores", nameEn: "Odor Removal", price: 25, category: "addons" },
  { id: "leather-treatment", nameEs: "Tratamiento de Cuero", nameEn: "Leather Treatment", price: 50, category: "addons" },
  { id: "fabric-protection", nameEs: "Protección de Tejido", nameEn: "Fabric Protection", price: 30, category: "addons" },
  { id: "hood-clean", nameEs: "Limpieza de Capó", nameEn: "Hood Cleaning", price: 20, category: "addons" },
];
