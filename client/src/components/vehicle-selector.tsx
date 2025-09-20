import { Car, Plus } from "lucide-react";
import { Vehicle } from "@shared/schema";

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onVehicleSelect: (vehicle: Vehicle) => void;
  onClose: () => void;
}

export default function VehicleSelector({ 
  vehicles, 
  selectedVehicle, 
  onVehicleSelect,
  onClose
}: VehicleSelectorProps) {
  const handleVehicleSelect = (vehicle: Vehicle) => {
    onVehicleSelect(vehicle);
    onClose();
  };

  const formatLastEvent = (vehicle: Vehicle) => {
    // This would normally come from the API, but for now we'll use the createdAt
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(vehicle.createdAt!));
  };

  return (
    <div 
      className="fixed top-20 left-0 right-0 bottom-0 bg-white border border-gray-200 shadow-lg z-[100] overflow-y-auto"
      data-testid="vehicle-selector"
    >
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Seus Veículos</h3>
        <p className="text-sm text-gray-500">Selecione um veículo para visualizar</p>
      </div>
      
      <div className="p-4 space-y-3">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => handleVehicleSelect(vehicle)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-sm ${
              selectedVehicle?.id === vehicle.id
                ? 'border-gray-800 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            data-testid={`button-select-vehicle-${vehicle.id}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  vehicle.status === 'active' ? 'bg-gray-800' : 'bg-gray-400'
                }`}>
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900" data-testid={`text-vehicle-name-${vehicle.id}`}>
                    {vehicle.name}
                  </h4>
                  <p className="text-sm text-gray-500" data-testid={`text-vehicle-plate-${vehicle.id}`}>
                    {vehicle.plate} • {vehicle.color}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900" data-testid={`text-vehicle-odometer-${vehicle.id}`}>
                  {vehicle.odometer.toLocaleString()} km
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                    vehicle.status === 'active' 
                      ? 'bg-green-50 text-green-700 border border-green-100' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`} data-testid={`status-vehicle-${vehicle.id}`}>
                    {vehicle.status === 'active' ? 'Ativo' : 'Vendido'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500">Combustível</p>
                <p className="text-sm font-medium text-gray-900">{vehicle.fuelType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Ano</p>
                <p className="text-sm font-medium text-gray-900">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Último evento</p>
                <p className="text-sm font-medium text-gray-900">{formatLastEvent(vehicle)}</p>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
          data-testid="button-add-vehicle"
        >
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Adicionar Veículo</span>
          </div>
        </button>
      </div>
    </div>
  );
}
