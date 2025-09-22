
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  MapPin,
  DollarSign,
  Fuel,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

const FuelSummaryScreen = () => {
  const [, setLocation] = useLocation();
  const [showDetails, setShowDetails] = useState(false);

  // Dados do abastecimento atual
  const currentFueling = {
    date: '2025-09-19',
    km: 89950,
    station: {
      name: 'Shell Select',
      brand: 'Shell',
      address: 'Av. Paulista, 1500 - Bela Vista'
    },
    fuels: [
      {
        type: 'Gasolina Comum',
        liters: 42.5,
        pricePerLiter: 5.49,
        totalPrice: 233.32
      },
      {
        type: 'Etanol',
        liters: 5.0,
        pricePerLiter: 3.89,
        totalPrice: 19.45
      }
    ],
    totalLiters: 47.5,
    totalValue: 252.77
  };

  // Dados do abastecimento anterior
  const previousFueling = {
    date: '2025-09-10',
    km: 88920,
    station: {
      name: 'Petrobras',
      brand: 'Petrobras',
      address: 'R. Augusta, 800 - Consolação'
    },
    fuels: [
      {
        type: 'Gasolina Comum',
        liters: 38.5,
        pricePerLiter: 5.42,
        totalPrice: 208.67
      }
    ],
    totalLiters: 38.5,
    totalValue: 208.67
  };

  // Cálculos comparativos
  const distanceTraveled = currentFueling.km - previousFueling.km;
  const daysBetween = Math.floor((new Date(currentFueling.date) - new Date(previousFueling.date)) / (1000 * 60 * 60 * 24));
  const consumption = (distanceTraveled / previousFueling.totalLiters).toFixed(1);
  const avgDailyKm = Math.round(distanceTraveled / daysBetween);
  
  // Comparações de preço
  const priceComparison = currentFueling.fuels[0].pricePerLiter - previousFueling.fuels[0].pricePerLiter;
  const priceChange = ((priceComparison / previousFueling.fuels[0].pricePerLiter) * 100).toFixed(1);
  
  // Comparação de valor total
  const valueComparison = currentFueling.totalValue - previousFueling.totalValue;
  const valuePercentChange = ((valueComparison / previousFueling.totalValue) * 100).toFixed(1);

  // Avaliação do consumo
  const getConsumptionStatus = () => {
    const consumptionValue = parseFloat(consumption);
    if (consumptionValue >= 12) return { status: 'excellent', color: 'green', label: 'Excelente' };
    if (consumptionValue >= 10) return { status: 'good', color: 'blue', label: 'Bom' };
    if (consumptionValue >= 8) return { status: 'average', color: 'yellow', label: 'Médio' };
    return { status: 'low', color: 'red', label: 'Baixo' };
  };

  const consumptionStatus = getConsumptionStatus();
  
  const goBack = () => {
    setLocation('/abastecimentos/quilometragem');
  };

  const goToHistory = () => {
    setLocation('/abastecimentos');
  };

  const getChangeIcon = (value) => {
    if (value > 0) return <TrendingUp className="w-4 h-4" />;
    if (value < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getChangeColor = (value, invert = false) => {
    if (value > 0) return invert ? 'text-red-600' : 'text-green-600';
    if (value < 0) return invert ? 'text-green-600' : 'text-red-600';
    return 'text-secondary';
  };

  const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  return (
    <div className="app-page">
      {/* Header */}
      <div className="app-header px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
            onClick={goBack}
          >
            <ArrowLeft className="w-5 h-5 text-secondary" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-primary">Resumo do Abastecimento</h1>
            <p className="text-sm text-secondary">Comparativo com abastecimento anterior</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Resumo Principal */}
        <div className="app-card rounded-large overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-blue-50">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Abastecimento Registrado</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-primary mb-1">
                {formatCurrency(currentFueling.totalValue)}
              </div>
              <div className="text-sm text-secondary">
                {currentFueling.totalLiters.toFixed(1)} litros • {currentFueling.station.name}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(currentFueling.date).toLocaleDateString('pt-BR', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric',
                  weekday: 'long'
                })}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">{distanceTraveled.toLocaleString('pt-BR')}</div>
                <div className="text-xs text-secondary">km rodados</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">{daysBetween}</div>
                <div className="text-xs text-secondary">dias</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">{avgDailyKm}</div>
                <div className="text-xs text-secondary">km/dia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Análise de Consumo */}
        <div className="app-card rounded-large overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-green-50">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-900">Análise de Consumo</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-primary">{consumption} km/L</div>
                <div className="text-sm text-secondary">Consumo no período</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                consumptionStatus.color === 'green' ? 'bg-green-100 text-green-800' :
                consumptionStatus.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                consumptionStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {consumptionStatus.label}
              </div>
            </div>

            <div className={`p-4 rounded-xl ${
              consumptionStatus.color === 'green' ? 'bg-green-50 border border-green-100' :
              consumptionStatus.color === 'blue' ? 'bg-blue-50 border border-blue-100' :
              consumptionStatus.color === 'yellow' ? 'bg-yellow-50 border border-yellow-100' :
              'bg-red-50 border border-red-100'
            }`}>
              <div className="flex items-start gap-3">
                <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  consumptionStatus.color === 'green' ? 'text-green-600' :
                  consumptionStatus.color === 'blue' ? 'text-blue-600' :
                  consumptionStatus.color === 'yellow' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />
                <div>
                  <div className={`text-sm font-medium mb-1 ${
                    consumptionStatus.color === 'green' ? 'text-green-900' :
                    consumptionStatus.color === 'blue' ? 'text-blue-900' :
                    consumptionStatus.color === 'yellow' ? 'text-yellow-900' :
                    'text-red-900'
                  }`}>
                    Avaliação do Consumo
                  </div>
                  <div className={`text-xs leading-relaxed ${
                    consumptionStatus.color === 'green' ? 'text-green-700' :
                    consumptionStatus.color === 'blue' ? 'text-blue-700' :
                    consumptionStatus.color === 'yellow' ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {consumptionStatus.status === 'excellent' && 'Parabéns! Seu veículo está com consumo excelente. Continue dirigindo de forma econômica.'}
                    {consumptionStatus.status === 'good' && 'Bom consumo! Seu veículo está dentro da média esperada para o modelo.'}
                    {consumptionStatus.status === 'average' && 'Consumo médio. Considere revisar hábitos de direção e manutenção do veículo.'}
                    {consumptionStatus.status === 'low' && 'Consumo abaixo do esperado. Recomendamos verificar a manutenção do veículo.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparações */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Comparativo</h3>
          
          {/* Comparação de Preços */}
          <div className="app-card rounded-large p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-primary">Preço do Combustível</h4>
                  <p className="text-xs text-secondary">Gasolina Comum - comparação</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {formatCurrency(currentFueling.fuels[0].pricePerLiter)}/L
                </div>
                <div className={`text-sm font-medium flex items-center gap-1 ${getChangeColor(priceComparison, true)}`}>
                  {getChangeIcon(priceComparison)}
                  {priceComparison === 0 ? 'Sem alteração' : 
                   `${priceComparison > 0 ? '+' : ''}${formatCurrency(Math.abs(priceComparison))} (${priceChange}%)`}
                </div>
              </div>
            </div>
            <div className="text-xs text-secondary flex justify-between">
              <span>Anterior: {formatCurrency(previousFueling.fuels[0].pricePerLiter)}/L</span>
              <span>
                {priceComparison > 0 ? 'Aumento no preço' : 
                 priceComparison < 0 ? 'Redução no preço' : 'Preço mantido'}
              </span>
            </div>
          </div>

          {/* Comparação de Posto */}
          <div className="app-card rounded-large p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-primary">Posto de Combustível</h4>
                  <p className="text-xs text-secondary">Local do abastecimento</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">{currentFueling.station.name}</div>
                {currentFueling.station.name !== previousFueling.station.name ? (
                  <div className="text-xs text-blue-600 font-medium">Posto diferente</div>
                ) : (
                  <div className="text-xs text-secondary">Mesmo posto</div>
                )}
              </div>
            </div>
            
            <div className="text-xs text-secondary">
              <div className="flex justify-between mb-1">
                <span>Atual:</span>
                <span>{currentFueling.station.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Anterior:</span>
                <span>{previousFueling.station.name}</span>
              </div>
            </div>
            
            {currentFueling.station.name !== previousFueling.station.name && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-700">
                  Você mudou de posto. Isso pode explicar a diferença no preço do combustível.
                </div>
              </div>
            )}
          </div>

          {/* Comparação de Valor Gasto */}
          <div className="app-card rounded-large p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-primary">Valor do Abastecimento</h4>
                  <p className="text-xs text-secondary">Comparação de gastos</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{formatCurrency(currentFueling.totalValue)}</div>
                <div className={`text-sm font-medium flex items-center gap-1 ${getChangeColor(valueComparison, true)}`}>
                  {getChangeIcon(valueComparison)}
                  {valueComparison === 0 ? 'Mesmo valor' : 
                   `${valueComparison > 0 ? '+' : ''}${formatCurrency(Math.abs(valueComparison))} (${valuePercentChange}%)`}
                </div>
              </div>
            </div>
            <div className="text-xs text-secondary flex justify-between">
              <span>Anterior: {formatCurrency(previousFueling.totalValue)}</span>
              <span>
                {valueComparison > 0 ? 'Gastou mais' : 
                 valueComparison < 0 ? 'Gastou menos' : 'Mesmo gasto'}
              </span>
            </div>
          </div>
        </div>

        {/* Insights Adicionais */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-blue-900 mb-2">Insights do Período</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Você rodou {distanceTraveled} km em {daysBetween} dias (média de {avgDailyKm} km/dia)</p>
                <p>• Seu consumo de {consumption} km/L está {consumptionStatus.label.toLowerCase()} para o Honda Civic</p>
                {currentFueling.station.name !== previousFueling.station.name && (
                  <p>• Mudança de posto pode ter influenciado na diferença de preço ({priceChange}%)</p>
                )}
                <p>• {valueComparison > 0 ? `Gastou ${formatCurrency(valueComparison)} a mais` : valueComparison < 0 ? `Economizou ${formatCurrency(Math.abs(valueComparison))}` : 'Gastou o mesmo valor'} comparado ao abastecimento anterior</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detalhes Expandidos */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-left app-card rounded-large p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {showDetails ? 'Ocultar detalhes' : 'Ver detalhes completos'}
            </span>
            <div className={`transform transition-transform ${showDetails ? 'rotate-180' : ''}`}>
              <TrendingUp className="w-4 h-4 text-secondary" />
            </div>
          </div>
        </button>

        {showDetails && (
          <div className="space-y-4">
            {/* Detalhes do Abastecimento Atual */}
            <div className="app-card rounded-large p-5">
              <h4 className="text-base font-semibold text-primary mb-4">Abastecimento Atual</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Data:</span>
                  <span className="font-medium">{new Date(currentFueling.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">KM:</span>
                  <span className="font-medium">{currentFueling.km.toLocaleString('pt-BR')} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Posto:</span>
                  <span className="font-medium">{currentFueling.station.name}</span>
                </div>
                {currentFueling.fuels.map((fuel, index) => (
                  <div key={index} className="border-t border-gray-100 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">{fuel.type}:</span>
                      <span className="font-medium">{fuel.liters}L • {formatCurrency(fuel.pricePerLiter)}/L</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detalhes do Abastecimento Anterior */}
            <div className="app-card rounded-large p-5">
              <h4 className="text-base font-semibold text-primary mb-4">Abastecimento Anterior</h4>
              <div className="space-y-3 text-sm text-secondary">
                <div className="flex justify-between">
                  <span>Data:</span>
                  <span>{new Date(previousFueling.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span>KM:</span>
                  <span>{previousFueling.km.toLocaleString('pt-BR')} km</span>
                </div>
                <div className="flex justify-between">
                  <span>Posto:</span>
                  <span>{previousFueling.station.name}</span>
                </div>
                {previousFueling.fuels.map((fuel, index) => (
                  <div key={index} className="border-t border-gray-100 pt-2">
                    <div className="flex justify-between items-center">
                      <span>{fuel.type}:</span>
                      <span>{fuel.liters}L • {formatCurrency(fuel.pricePerLiter)}/L</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botão fixo no rodapé */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button
          onClick={goToHistory}
          className="w-full py-4 rounded-2xl font-semibold bg-blue-600 text-white active:scale-95 hover:bg-blue-700 transition-all duration-200"
        >
          Ver Histórico de Abastecimentos
        </button>
      </div>
    </div>
  );
};

export default FuelSummaryScreen;
