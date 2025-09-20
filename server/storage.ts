import { type Vehicle, type InsertVehicle, type VehicleEvent, type InsertVehicleEvent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Vehicle methods
  getVehicles(): Promise<Vehicle[]>;
  getVehicle(id: string): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, vehicle: Partial<InsertVehicle>): Promise<Vehicle | undefined>;
  deleteVehicle(id: string): Promise<boolean>;

  // Vehicle Event methods
  getVehicleEvents(vehicleId: string): Promise<VehicleEvent[]>;
  getVehicleEvent(id: string): Promise<VehicleEvent | undefined>;
  createVehicleEvent(event: InsertVehicleEvent): Promise<VehicleEvent>;
  updateVehicleEvent(id: string, event: Partial<InsertVehicleEvent>): Promise<VehicleEvent | undefined>;
  deleteVehicleEvent(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private vehicles: Map<string, Vehicle>;
  private vehicleEvents: Map<string, VehicleEvent>;

  constructor() {
    this.vehicles = new Map();
    this.vehicleEvents = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample vehicles
    const sampleVehicles: Vehicle[] = [
      {
        id: "1",
        name: "Honda Civic 2018",
        plate: "ABC-1234",
        color: "Prata",
        year: 2018,
        odometer: 45230,
        fuelType: "Gasolina",
        status: "active",
        createdAt: new Date("2023-01-01"),
      },
      {
        id: "2",
        name: "Toyota Corolla 2020",
        plate: "DEF-5678",
        color: "Branco",
        year: 2020,
        odometer: 28450,
        fuelType: "Flex",
        status: "active",
        createdAt: new Date("2023-02-01"),
      },
      {
        id: "3",
        name: "Volkswagen Gol 2015",
        plate: "GHI-9012",
        color: "Azul",
        year: 2015,
        odometer: 89750,
        fuelType: "Flex",
        status: "sold",
        createdAt: new Date("2022-01-01"),
      },
    ];

    // Sample events
    const sampleEvents: VehicleEvent[] = [
      {
        id: "1",
        vehicleId: "1",
        type: "fuel",
        title: "Shell Centro",
        description: "Abastecimento completo realizado no Shell Centro. Excelente eficiência de combustível detectada.",
        location: "Av. Principal, 1250",
        odometer: 45230,
        cost: "255.30",
        date: new Date("2025-09-19T14:30:00"),
        details: {
          liters: 42.5,
          price_per_liter: 6.01,
          fuel_type: "Gasolina Comum",
          km_traveled: 540,
          efficiency: "12.7 km/L"
        },
        nextAction: "Próximo abastecimento estimado em 420 km",
        images: null,
        createdAt: new Date("2025-09-19T14:30:00"),
      },
      {
        id: "2",
        vehicleId: "1",
        type: "maintenance",
        title: "Troca de óleo e filtros",
        description: "Manutenção preventiva realizada conforme manual do proprietário. Óleo sintético 5W30 aplicado.",
        location: "Auto Center Silva",
        odometer: 45000,
        cost: "280.00",
        date: new Date("2025-09-15T08:00:00"),
        details: {
          oil_type: "Sintético 5W30",
          oil_filter: "Bosch 0986452041",
          air_filter: "Mann C2672",
          labor: "R$ 80.00",
          parts: "R$ 200.00"
        },
        nextAction: "Próxima troca em 10.000 km ou 6 meses",
        images: null,
        createdAt: new Date("2025-09-15T08:00:00"),
      },
      {
        id: "3",
        vehicleId: "1",
        type: "inspection",
        title: "Inspeção Veicular 2025",
        description: "Inspeção veicular anual aprovada. Veículo em conformidade com todas as normas de segurança e emissões.",
        location: "Detran - Unidade Centro",
        odometer: 44950,
        cost: "78.50",
        date: new Date("2025-09-10T16:20:00"),
        details: {
          status: "Aprovado",
          emissions: "Conforme",
          brakes: "OK",
          lights: "OK",
          certificate: "Válido até Set/2026"
        },
        nextAction: "Renovar em setembro de 2026",
        images: null,
        createdAt: new Date("2025-09-10T16:20:00"),
      },
      {
        id: "4",
        vehicleId: "1",
        type: "fuel",
        title: "Posto BR Rodovia",
        description: "Abastecimento em viagem. Preço ligeiramente acima da média da região.",
        location: "BR-101, Km 485",
        odometer: 44690,
        cost: "180.75",
        date: new Date("2025-09-02T19:45:00"),
        details: {
          liters: 30.0,
          price_per_liter: 6.02,
          fuel_type: "Gasolina Comum",
          km_traveled: 385,
          efficiency: "12.8 km/L"
        },
        nextAction: null,
        images: null,
        createdAt: new Date("2025-09-02T19:45:00"),
      },
      {
        id: "5",
        vehicleId: "1",
        type: "repair",
        title: "Substituição de pneus",
        description: "Substituição dos 4 pneus devido ao desgaste excessivo. Alinhamento e balanceamento inclusos.",
        location: "Pneus & Cia",
        odometer: 44500,
        cost: "920.00",
        date: new Date("2025-08-28T14:15:00"),
        details: {
          brand: "Michelin Energy XM2+",
          size: "185/65 R15",
          quantity: 4,
          alignment: "Incluído",
          balancing: "Incluído"
        },
        nextAction: "Verificar pressão semanalmente",
        images: null,
        createdAt: new Date("2025-08-28T14:15:00"),
      },
      {
        id: "6",
        vehicleId: "1",
        type: "milestone",
        title: "45.000 km alcançados",
        description: "Marco de quilometragem atingido. Veículo com excelente histórico de manutenção.",
        location: "Sistema",
        odometer: 45000,
        cost: "0",
        date: new Date("2025-09-15"),
        details: {
          total_fuel_cost: "R$ 12.450",
          total_maintenance: "R$ 3.200",
          avg_consumption: "12.9 km/L",
          uptime: "99.2%"
        },
        nextAction: null,
        images: null,
        createdAt: new Date("2025-09-15"),
      },
    ];

    sampleVehicles.forEach(vehicle => this.vehicles.set(vehicle.id, vehicle));
    sampleEvents.forEach(event => this.vehicleEvents.set(event.id, event));
  }

  // Vehicle methods
  async getVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getVehicle(id: string): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = randomUUID();
    const vehicle: Vehicle = {
      ...insertVehicle,
      id,
      status: insertVehicle.status || "active",
      odometer: insertVehicle.odometer || 0,
      createdAt: new Date(),
    };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  async updateVehicle(id: string, updateData: Partial<InsertVehicle>): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) return undefined;

    const updated: Vehicle = { ...vehicle, ...updateData };
    this.vehicles.set(id, updated);
    return updated;
  }

  async deleteVehicle(id: string): Promise<boolean> {
    return this.vehicles.delete(id);
  }

  // Vehicle Event methods
  async getVehicleEvents(vehicleId: string): Promise<VehicleEvent[]> {
    return Array.from(this.vehicleEvents.values())
      .filter(event => event.vehicleId === vehicleId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getVehicleEvent(id: string): Promise<VehicleEvent | undefined> {
    return this.vehicleEvents.get(id);
  }

  async createVehicleEvent(insertEvent: InsertVehicleEvent): Promise<VehicleEvent> {
    const id = randomUUID();
    const event: VehicleEvent = {
      ...insertEvent,
      id,
      date: insertEvent.date || new Date(),
      details: insertEvent.details || null,
      description: insertEvent.description || null,
      location: insertEvent.location || null,
      nextAction: insertEvent.nextAction || null,
      images: insertEvent.images || null,
      createdAt: new Date(),
    };
    this.vehicleEvents.set(id, event);
    return event;
  }

  async updateVehicleEvent(id: string, updateData: Partial<InsertVehicleEvent>): Promise<VehicleEvent | undefined> {
    const event = this.vehicleEvents.get(id);
    if (!event) return undefined;

    const updated: VehicleEvent = { ...event, ...updateData };
    this.vehicleEvents.set(id, updated);
    return updated;
  }

  async deleteVehicleEvent(id: string): Promise<boolean> {
    return this.vehicleEvents.delete(id);
  }
}

export const storage = new MemStorage();
