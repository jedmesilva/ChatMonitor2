import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Fuel,
  MapPin,
  Calendar,
  Activity,
  DollarSign,
  MoreHorizontal,
  Filter,
  Search,
  Car,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Ícone customizado do odômetro
const OdometerIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="5" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="8" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="11" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="14" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="17" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
  </svg>
);

// Ícone customizado do tanque de combustível
const FuelTankIcon = ({ size = 24, className = "", level = 0.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="6" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect 
      x="7" 
      y={6 + (13 * (1 - level))} 
      width="10" 
      height={13 * level} 
      rx="1" 
      fill="currentColor"
      opacity="0.3"
    />
    <rect x="18" y="10" width="2" height="4" rx="1" fill="currentColor"/>
    <path d="M18 12H20" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="13" r="1" fill="currentColor"/>
  </svg>
);

const FuelHistoryScreen = () => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Dados do veículo atual
  const currentVehicle = {
    name: 'Honda Civic',
    year: '2020',
    plate: 'ABC-1234',
    odometer: 89450,
    fuelLevel: 60, // porcentagem
    autonomy: 320, // km restantes
    avgConsumption: 12.5
  };

  // Dados dos abastecimentos
  const fuelingHistory = [
    {
      id: 1,
      date: '2025-09-19',
      time: '14:30',
      station: {
        name: 'Shell Select',
        brand: 'Shell',
        address: 'Av. Paulista, 1500 - Bela Vista'
      },
      odometer: 89450,
      fuels: [
        {
          type: 'Gasolina Comum',
          liters: 42.5,
          pricePerLiter: 5.49,
          totalPrice: 233.32
        }
      ],
      totalLiters: 42.5,
      totalValue: 233.32,
      efficiency: 12.7,
      kmTraveled: 540,
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-09-10',
      time: '08:15',
      station: {
        name: 'Petrobras Centro',
        brand: 'Petrobras',
        address: 'R. Augusta, 800 - Consolação'
      },
      odometer: 88910,
      fuels: [
        {
          type: 'Gasolina Comum',
          liters: 38.5,
          pricePerLiter: 5.42,
          totalPrice: 208.67
        }
      ],
      totalLiters: 38.5,
      totalValue: 208.67,
      efficiency: 13.1,
      kmTraveled: 505,
      status: 'completed'
    },
    {
      id: 3,
      date: '2025-09-01',
      time: '16:45',
      station: {
        name: 'Ipiranga Express',
        brand: 'Ipiranga',
        address: 'Av. Rebouças, 1200 - Pinheiros'
      },
      odometer: 88405,
      fuels: [
        {
          type: 'Gasolina Comum',
          liters: 35.0,
          pricePerLiter: 5.38,
          totalPrice: 188.30
        },
        {
          type: 'Etanol',
          liters: 8.0,
          pricePerLiter: 3.89,
          totalPrice: 31.12
        }
      ],
      totalLiters: 43.0,
      totalValue: 219.42,
      efficiency: 12.2,
      kmTraveled: 525,
      status: 'completed'
    },
    {
      id: 4,
      date: '2025-08-22',
      time: '19:20',
      station: {
        name: 'BR Mania',
        brand: 'BR',
        address: 'R. Consolação, 2500 - Vila Mariana'
      },
      odometer: 87880,
      fuels: [
        {
          type: 'Etanol',
          liters: 45.0,
          pricePerLiter: 3.92,
          totalPrice: 176.40
        }
      ],
      totalLiters: 45.0,
      totalValue: 176.40,
      efficiency: 10.8,
      kmTraveled: 486,
      status: 'completed'
    },
    {
      id: 5,
      date: '2025-08-12',
      time: '11:30',
      station: {
        name: 'Shell Marginal',
        brand: 'Shell',
        address: 'Marginal Tietê, 8500 - Lapa'
      },
      odometer: 87394,
      fuels: [
        {
          type: 'Gasolina Aditivada',
          liters: 40.2,
          pricePerLiter: 5.69,
          totalPrice: 228.74
        }
      ],
      totalLiters: 40.2,
      totalValue: 228.74,
      efficiency: 13.4,
      kmTraveled: 538,
      status: 'completed'
    }
  ];

  // Estatísticas resumidas
  const monthlyStats = {
    totalSpent: 1066.55,
    totalLiters: 208.7,
    avgPrice: 5.11,
    avgConsumption: 12.4,
    totalKm: 2594,
    abastecimentos: 5
  };

  // Comparações com mês anterior
  const comparisons = {
    spending: { value: 1066.55, change: +8.5, trend: 'up' },
    consumption: { value: 12.4, change: -0.3, trend: 'down' },
    frequency: { value: 5, change: 0, trend: 'stable' },
    avgPrice: { value: 5.11, change: +0.12, trend: 'up' }
  };

  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-red-600';
      case 'down': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getFuelTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Gasolina Comum': 'bg-red-100 text-red-800',
      'Gasolina Aditivada': 'bg-red-100 text-red-800',
      'Etanol': 'bg-green-100 text-green-800',
      'Diesel': 'bg-yellow-100 text-yellow-800',
      'GNV': 'bg-blue-100 text-blue-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const handleNewFueling = () => {
    setLocation('/abastecimentos/posto');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
            onClick={() => setLocation('/')}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">Abastecimentos</h1>
            <p className="text-sm text-gray-500">{currentVehicle.name} • {currentVehicle.plate}</p>
          </div>
          <button 
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Status do Veículo */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-900">Status Atual</span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <OdometerIcon size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {currentVehicle.odometer.toLocaleString()} km
                  </div>
                  <div className="text-xs text-gray-500">Quilometragem</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FuelTankIcon size={20} className="text-gray-600" level={currentVehicle.fuelLevel / 100} />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{currentVehicle.fuelLevel}%</div>
                  <div className="text-xs text-gray-500">Combustível</div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Autonomia atual</span>
              </div>
              <p className="text-sm text-gray-700">
                Aproximadamente {currentVehicle.autonomy} km restantes
              </p>
            </div>
          </div>
        </div>

        {/* Estatísticas do Mês */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-900">Setembro 2025</span>
              </div>
              <span className="text-xs text-gray-500">{monthlyStats.abastecimentos} abastecimentos</span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Gasto Total */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Gasto Total</span>
                  {getTrendIcon(comparisons.spending.trend)}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {formatCurrency(comparisons.spending.value)}
                </div>
                <div className={`text-xs font-medium ${getTrendColor(comparisons.spending.trend)}`}>
                  {comparisons.spending.change > 0 ? '+' : ''}{comparisons.spending.change.toFixed(1)}% vs anterior
                </div>
              </div>
              
              {/* Consumo Médio */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Consumo Médio</span>
                  {getTrendIcon(comparisons.consumption.trend)}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {comparisons.consumption.value.toFixed(1)} km/L
                </div>
                <div className={`text-xs font-medium ${getTrendColor(comparisons.consumption.trend)}`}>
                  {comparisons.consumption.change > 0 ? '+' : ''}{comparisons.consumption.change.toFixed(1)} vs anterior
                </div>
              </div>
              
              {/* Total de Litros */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Litros</span>
                  <Fuel className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {monthlyStats.totalLiters.toFixed(1)}L
                </div>
                <div className="text-xs text-gray-600">
                  {monthlyStats.totalKm.toLocaleString()} km rodados
                </div>
              </div>
              
              {/* Preço Médio */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Preço Médio</span>
                  {getTrendIcon(comparisons.avgPrice.trend)}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {formatCurrency(comparisons.avgPrice.value)}/L
                </div>
                <div className={`text-xs font-medium ${getTrendColor(comparisons.avgPrice.trend)}`}>
                  {comparisons.avgPrice.change > 0 ? '+' : ''}{formatCurrency(Math.abs(comparisons.avgPrice.change))} vs anterior
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Busca (se necessário) */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por posto, data ou valor..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Lista de Abastecimentos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Histórico</h2>
            <span className="text-sm text-gray-500">{fuelingHistory.length} registros</span>
          </div>
          
          <div className="space-y-3">
            {fuelingHistory.map((fueling, index) => (
              <div key={fueling.id} className="bg-white rounded-2xl border border-gray-200 p-4">
                {/* Header do Card */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{fueling.station.name}</h3>
                      <span className="text-xs text-gray-500">#{fueling.id.toString().padStart(3, '0')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{fueling.station.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(fueling.date)} às {fueling.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <OdometerIcon size={12} className="text-gray-400" />
                        <span>{fueling.odometer.toLocaleString()} km</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                {/* Combustíveis */}
                <div className="space-y-2 mb-3">
                  {fueling.fuels.map((fuel, fuelIndex) => (
                    <div key={fuelIndex} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getFuelTypeColor(fuel.type)}`}>
                          {fuel.type}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {fuel.liters}L
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(fuel.totalPrice)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(fuel.pricePerLiter)}/L
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Footer com Totais e Eficiência */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(fueling.totalValue)}
                      </div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {fueling.totalLiters}L
                      </div>
                      <div className="text-xs text-gray-500">Volume</div>
                    </div>
                    
                    {fueling.efficiency && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {fueling.efficiency.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">km/L</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700 font-medium">Completo</span>
                  </div>
                </div>
                
                {/* Indicador de distância percorrida */}
                {fueling.kmTraveled && (
                  <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <Activity className="w-3 h-3" />
                      <span>
                        {fueling.kmTraveled} km desde o último abastecimento
                        {index < fuelingHistory.length - 1 && ` • ${((fueling.kmTraveled / fueling.totalLiters) || 0).toFixed(1)} km/L`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action para mais dados */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Análises Detalhadas</h3>
          <p className="text-sm text-gray-700 mb-4">
            Acesse gráficos e relatórios completos do seu histórico de combustível
          </p>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            Ver Relatórios
          </button>
        </div>
      </div>

      {/* Botão Flutuante - Novo Abastecimento */}
      <button
        onClick={handleNewFueling}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gray-800 text-white rounded-2xl shadow-lg hover:bg-gray-700 active:scale-95 transition-all duration-200 flex items-center justify-center z-10"
      >
        <Fuel className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FuelHistoryScreen;