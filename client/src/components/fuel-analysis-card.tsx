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
    <div className={`bg-white border border-gray-200 rounded-xl p-5 mb-3 shadow-sm ${
      isActive ? 'ring-1 ring-gray-300' : ''
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`rounded-xl p-3 ${isActive ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Activity className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">Análise de Abastecimento</h3>
          <p className="text-xs text-gray-500">Último abastecimento</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          OK
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-600">Volume</span>
          <span className="text-sm font-bold text-gray-900">{fuelData?.liters || 42.5}L</span>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-xs text-gray-700 font-medium">Consumo</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{analysisResults.consumption} km/L</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="text-xs text-gray-700 font-medium">Preço/L</span>
            </div>
            <span className="text-sm font-bold text-gray-900">R$ {analysisResults.cost}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
