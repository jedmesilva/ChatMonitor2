import { Activity, CheckCircle, TrendingUp, DollarSign } from "lucide-react";

interface FuelAnalysisCardProps {
  fuelData?: {
    liters?: number;
    efficiency?: string;
    price_per_liter?: number;
  };
  isActive?: boolean;
}

export default function FuelAnalysisCard({ 
  fuelData, 
  isActive = false 
}: FuelAnalysisCardProps) {
  const analysisResults = {
    consumption: fuelData?.efficiency || '12.7',
    efficiency: 'excelente',
    cost: fuelData?.price_per_liter?.toString() || '6.01',
    comparison: 'melhor'
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 mb-2 shadow-sm ${
      isActive ? 'ring-1 ring-gray-300' : ''
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`rounded-lg p-2 ${isActive ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Activity className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">Análise de Abastecimento</h3>
          <p className="text-xs text-gray-400">Último abastecimento</p>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100">
          <CheckCircle className="w-3 h-3 mr-0.5" />
          OK
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-gray-500">Volume</span>
          <span className="text-xs font-semibold text-gray-800">{fuelData?.liters || 42.5}L</span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-600 font-medium">Consumo</span>
            </div>
            <span className="text-xs font-semibold text-gray-800">{analysisResults.consumption} km/L</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-600 font-medium">Preço/L</span>
            </div>
            <span className="text-xs font-semibold text-gray-800">R$ {analysisResults.cost}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
