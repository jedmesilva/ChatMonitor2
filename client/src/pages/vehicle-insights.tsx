import React, { useMemo } from 'react';
import { Activity, TrendingUp, TrendingDown, DollarSign, Wrench, Target, MapPin, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import { useLocation } from 'wouter';

// Componentes de ícones isolados
const OdometerIcon = React.memo(({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="5" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="8" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="11" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="14" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
    <rect x="17" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
  </svg>
));

const FuelPumpIcon = React.memo(({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M4 20V6C4 4.89543 4.89543 4 6 4H12C13.1046 4 14 4.89543 14 6V11H16L18 13V18H16V20" 
      stroke="currentColor" 
      strokeWidth="2"
      fill="none"
    />
    <path d="M4 8H14" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 15H18" stroke="currentColor" strokeWidth="2"/>
    <rect x="6" y="6" width="6" height="2" fill="currentColor"/>
  </svg>
));

const FuelTankIcon = React.memo(({ size = 24, className = "", level = 0.6 }) => (
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
));

export default function VehicleInsightsScreen() {
  const [, setLocation] = useLocation();

  // Dados do veículo
  const vehicleData = useMemo(() => ({
    name: 'Honda Civic',
    year: '2020',
    plate: 'ABC-1234',
    color: 'Prata',
    odometer: '89.450 km',
    lastFuel: {
      amount: '42L',
      date: '15/09/2025',
      pricePerLiter: 'R$ 5,49/L',
      totalPrice: 'R$ 230,58',
      type: 'Gasolina comum'
    },
    tankLevel: {
      percentage: 40,
      remaining: '~24L',
      autonomy: '~300 km',
      efficiency: '12,5 km/L'
    },
    avgConsumption: {
      value: '12,5 km/L',
      change: '+0,3 vs anterior',
      period: 'Últimos 1.000 km',
      trend: 'up'
    },
    financialInsights: {
      monthlySpending: 'R$ 892,45',
      costPerKm: 'R$ 0,48',
      projectedSpending: 'R$ 950,00',
      savings: 'R$ 57,55',
      savingsPercentage: '+6,8%'
    },
    healthScore: {
      overall: 87
    },
    maintenance: {
      upcomingItems: [
        { item: 'Troca de óleo', km: '550 km', priority: 'high' },
        { item: 'Alinhamento', km: '1.200 km', priority: 'medium' },
        { item: 'Troca de pneus', km: '8.500 km', priority: 'low' }
      ]
    },
    goals: {
      monthlyFuelTarget: 160,
      currentConsumption: 142,
      economyTarget: 13.0,
      currentEfficiency: 12.5
    },
    fuelTypes: {
      gasolina: { percentage: 65, avgPrice: 5.49, totalSpent: 580.45, efficiency: 12.8 },
      etanol: { percentage: 35, avgPrice: 4.12, totalSpent: 312.00, efficiency: 9.2 }
    },
    recentRefuels: [
      { date: '15/09', type: 'Gasolina comum', amount: 42, price: 5.49, total: 230.58, efficiency: 12.5 },
      { date: '08/09', type: 'Etanol', amount: 38, price: 4.12, total: 156.56, efficiency: 9.1 },
      { date: '01/09', type: 'Gasolina comum', amount: 40, price: 5.52, total: 220.80, efficiency: 12.9 },
      { date: '25/08', type: 'Etanol', amount: 35, price: 4.08, total: 142.80, efficiency: 9.3 }
    ],
    alerts: [
      {
        title: 'Combustível baixo',
        message: 'Reste cerca de 300km de autonomia',
        detail: 'Próximo posto: Shell - R. das Palmeiras, 2,3km',
        color: 'amber',
        priority: 'high'
      },
      {
        title: 'Próxima revisão',
        message: 'Em ~550km ou 15 dias',
        detail: '90.000km - Revisão dos 90 mil',
        color: 'gray',
        priority: 'medium'
      }
    ]
  }), []);

  // Dados para gráficos
  const consumptionData = useMemo(() => [
    { month: 'Abr', consumption: 11.8, spending: 780, liters: 68 },
    { month: 'Mai', consumption: 12.1, spending: 850, liters: 71 },
    { month: 'Jun', consumption: 12.3, spending: 820, liters: 65 },
    { month: 'Jul', consumption: 12.0, spending: 890, liters: 75 },
    { month: 'Ago', consumption: 12.2, spending: 875, liters: 73 },
    { month: 'Set', consumption: 12.5, spending: 892, liters: 72 }
  ], []);

  const routesData = useMemo(() => [
    { name: 'Casa-Trabalho', percentage: 45 },
    { name: 'Compras', percentage: 25 },
    { name: 'Lazer', percentage: 20 },
    { name: 'Outros', percentage: 10 }
  ], []);

  const usageData = useMemo(() => [
    { hour: '6h', usage: 15 },
    { hour: '8h', usage: 85 },
    { hour: '12h', usage: 30 },
    { hour: '18h', usage: 95 },
    { hour: '20h', usage: 25 },
    { hour: '22h', usage: 10 }
  ], []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLocation('/')}
              className="hover:bg-gray-700 rounded-lg p-2 transition-colors"
              data-testid="button-back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold">Monitor do veículo</h1>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Vehicle Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{vehicleData.name} {vehicleData.year}</h1>
          <p className="text-gray-600">{vehicleData.plate} • {vehicleData.color}</p>
        </div>
        
        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gray-100 rounded-lg p-2">
                <OdometerIcon size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Quilometragem</h3>
                <p className="text-xs text-gray-500">Total percorrido</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{vehicleData.odometer}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gray-100 rounded-lg p-2">
                <Activity size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Consumo Atual</h3>
                <p className="text-xs text-gray-500">Eficiência média</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900">{vehicleData.avgConsumption.value}</p>
              <TrendingUp className="text-green-600 mb-1" size={16} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gray-100 rounded-lg p-2">
                <DollarSign size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Gasto Mensal</h3>
                <p className="text-xs text-gray-500">Combustível</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900">{vehicleData.financialInsights.monthlySpending}</p>
              <span className="text-xs text-green-600 font-medium">{vehicleData.financialInsights.savingsPercentage}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gray-100 rounded-lg p-2">
                <Wrench size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Saúde Geral</h3>
                <p className="text-xs text-gray-500">Score do veículo</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{vehicleData.healthScore.overall}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-600 h-2 rounded-full" 
                  style={{ width: `${vehicleData.healthScore.overall}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Consumo de Combustível</h3>
              <p className="text-sm text-gray-500">Litros consumidos por mês</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={consumptionData} margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }} 
                  label={{ value: 'Litros', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '12px' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`${value}L`, 'Consumo']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="liters" 
                  stroke="#6B7280" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#6B7280', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, fill: '#6B7280' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Gastos Mensais</h3>
              <p className="text-sm text-gray-500">Histórico de despesas</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'R$', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '12px' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Gastos']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Bar dataKey="spending" fill="#6B7280" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Análise por Combustível */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <FuelPumpIcon className="text-gray-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Análise por Combustível</h3>
            </div>
            <div className="space-y-4">
              {Object.entries(vehicleData.fuelTypes).map(([type, data]) => {
                const typeNames = { gasolina: 'Gasolina', etanol: 'Etanol' };
                return (
                  <div key={type} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{typeNames[type as keyof typeof typeNames]}</span>
                      <span className="text-sm text-gray-500">{data.percentage}% do uso</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Preço médio</p>
                        <p className="font-medium">R$ {data.avgPrice.toFixed(2)}/L</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Gasto total</p>
                        <p className="font-medium">R$ {data.totalSpent.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Eficiência</p>
                        <p className="font-medium">{data.efficiency.toFixed(1)} km/L</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Custo/km</p>
                        <p className="font-medium">R$ {(data.avgPrice / data.efficiency).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <FuelTankIcon className="text-gray-600" size={24} level={0.6} />
              <h3 className="text-lg font-semibold text-gray-900">Últimos Abastecimentos</h3>
            </div>
            <div className="space-y-3">
              {vehicleData.recentRefuels.map((refuel, index) => {
                const fuelColors = {
                  'Gasolina comum': 'bg-gray-100 text-gray-800',
                  'Etanol': 'bg-green-100 text-green-800',
                  'Gasolina aditivada': 'bg-blue-100 text-blue-800'
                };
                
                return (
                  <div key={index} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">{refuel.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${fuelColors[refuel.type as keyof typeof fuelColors] || 'bg-gray-100 text-gray-800'}`}>
                        {refuel.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                      <div>
                        <span className="block">{refuel.amount}L</span>
                        <span className="text-gray-500">Volume</span>
                      </div>
                      <div>
                        <span className="block">R$ {refuel.total.toFixed(2)}</span>
                        <span className="text-gray-500">Total</span>
                      </div>
                      <div>
                        <span className="block">{refuel.efficiency} km/L</span>
                        <span className="text-gray-500">Eficiência</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Outras Análises */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="text-gray-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Análise Financeira</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Custo por km</span>
                <span className="font-semibold">{vehicleData.financialInsights.costPerKm}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projeção mensal</span>
                <span className="font-semibold">{vehicleData.financialInsights.projectedSpending}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Economia estimada</span>
                <span className="font-semibold text-green-600">+{vehicleData.financialInsights.savings}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-gray-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Rotas Principais</h3>
            </div>
            <div className="space-y-3">
              {routesData.map((route, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-sm text-gray-700">{route.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{route.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-gray-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Horários de Uso</h3>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={usageData}>
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Bar dataKey="usage" fill="#6B7280" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metas e Manutenção */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-gray-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Metas do Mês</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Consumo de combustível</span>
                  <span className="text-sm font-medium">{vehicleData.goals.currentConsumption}L / {vehicleData.goals.monthlyFuelTarget}L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-600 h-2 rounded-full" 
                    style={{ width: `${(vehicleData.goals.currentConsumption / vehicleData.goals.monthlyFuelTarget) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Eficiência</span>
                  <span className="text-sm font-medium">{vehicleData.goals.currentEfficiency} / {vehicleData.goals.economyTarget} km/L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-600 h-2 rounded-full" 
                    style={{ width: `${(vehicleData.goals.currentEfficiency / vehicleData.goals.economyTarget) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="text-gray-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Próximas Manutenções</h3>
            </div>
            <div className="space-y-3">
              {vehicleData.maintenance.upcomingItems.map((item, index) => {
                const priorityColors = {
                  high: 'bg-red-100 border-red-200 text-red-800',
                  medium: 'bg-yellow-100 border-yellow-200 text-yellow-800',
                  low: 'bg-gray-100 border-gray-200 text-gray-800'
                };
                
                return (
                  <div key={index} className={`p-3 rounded-lg border ${priorityColors[item.priority as keyof typeof priorityColors]}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.item}</span>
                      <span className="text-xs">{item.km}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-gray-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Alertas e Notificações</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicleData.alerts.map((alert, index) => {
              const colorClasses = {
                amber: { bg: 'bg-amber-50', border: 'border-amber-100', dot: 'bg-amber-400', title: 'text-amber-900', text: 'text-amber-700' },
                gray: { bg: 'bg-gray-50', border: 'border-gray-100', dot: 'bg-gray-400', title: 'text-gray-900', text: 'text-gray-600' }
              };
              const colors = colorClasses[alert.color as keyof typeof colorClasses];
              
              return (
                <div key={index} className={`${colors.bg} ${colors.border} rounded-xl p-4`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 ${colors.dot} rounded-full mt-2 flex-shrink-0`}></div>
                    <div>
                      <p className={`font-medium ${colors.title} mb-1`}>{alert.title}</p>
                      <p className={`text-sm ${colors.text} mb-1`}>{alert.message}</p>
                      <p className={`text-xs ${colors.text} opacity-75`}>{alert.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}