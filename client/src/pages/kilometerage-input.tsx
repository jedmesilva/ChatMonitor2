
import React, { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, 
  Check, 
  Camera, 
  Mic, 
  Upload,
  AlertCircle,
  MapPin,
  Gauge
} from 'lucide-react';

const KilometerageInputScreen = () => {
  const [, setLocation] = useLocation();
  const [km, setKm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef(null);

  // Dados do veículo atual
  const currentVehicle = {
    name: 'Honda Civic',
    year: '2020',
    plate: 'ABC-1234',
    lastKm: 89450,
    lastFuel: {
      date: '10/09/2025',
      items: [
        { liters: 38.5, type: 'Gasolina Comum', price: 5.49 }
      ],
      km: 88920
    }
  };

  // Posto selecionado na etapa anterior
  const selectedStation = {
    id: 1,
    name: 'Shell Select',
    brand: 'Shell',
    address: 'Av. Paulista, 1500 - Bela Vista',
    distance: '0.8 km'
  };

  // Combustíveis da etapa anterior
  const fuelItems = [
    {
      id: 1,
      fuelType: 'Gasolina Comum',
      liters: '42,5',
      pricePerLiter: '5,49',
      totalPrice: '233,32'
    },
    {
      id: 2,
      fuelType: 'Etanol',
      liters: '5,0',
      pricePerLiter: '3,89',
      totalPrice: '19,45'
    }
  ];

  // Formatação de KM
  const formatKm = (value) => {
    const numValue = value.replace(/[^\d]/g, '');
    return numValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Calcular totais dos combustíveis
  const totalLiters = fuelItems.reduce((sum, item) => sum + parseFloat(item.liters.replace(',', '.')), 0);
  const totalValue = fuelItems.reduce((sum, item) => sum + parseFloat(item.totalPrice.replace(',', '.')), 0);

  // Validação da quilometragem
  const validateKmInput = () => {
    if (!km) return true; // KM é opcional
    
    const kmNumber = parseInt(km.replace(/[^\d]/g, ''));
    
    if (kmNumber <= currentVehicle.lastKm) {
      setError(`KM deve ser maior que ${currentVehicle.lastKm.toLocaleString('pt-BR')}`);
      return false;
    }

    if (kmNumber > currentVehicle.lastKm + 10000) {
      setError('KM parece muito alto. Verifique se está correto.');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleInputChange = (value) => {
    const formattedValue = formatKm(value);
    setKm(formattedValue);
    setError('');
  };

  const handleSubmit = () => {
    if (validateKmInput()) {
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        console.log('Abastecimento salvo:', { 
          station: selectedStation, 
          fuelItems, 
          km: km ? parseInt(km.replace(/[^\d]/g, '')) : null 
        });
        setLocation('/abastecimentos/resumo');
      }, 800);
    }
  };

  const skipKm = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      console.log('Abastecimento salvo sem KM:', { 
        station: selectedStation, 
        fuelItems 
      });
      setLocation('/abastecimentos/resumo');
    }, 800);
  };

  const goBack = () => {
    setLocation('/abastecimentos/combustivel');
  };

  const simulateKmCapture = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      // Simular KM detectado
      const mockKm = (currentVehicle.lastKm + Math.floor(Math.random() * 500) + 100).toString();
      const formattedKm = formatKm(mockKm);
      setKm(formattedKm);
      setIsProcessing(false);
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      simulateKmCapture();
    }
  };

  // Calcular consumo estimado
  const getEstimatedConsumption = () => {
    if (!km || !currentVehicle.lastFuel.km) return null;
    
    const distance = parseInt(km.replace(/[^\d]/g, '')) - currentVehicle.lastFuel.km;
    const lastFuelLiters = currentVehicle.lastFuel.items.reduce((sum, item) => sum + item.liters, 0);
    
    if (distance > 0 && lastFuelLiters > 0) {
      return (distance / lastFuelLiters).toFixed(1);
    }
    
    return null;
  };

  const getFuelTypeColor = (fuelType) => {
    const colors = {
      'Gasolina Comum': 'bg-red-100 text-red-800',
      'Gasolina Aditivada': 'bg-red-100 text-red-800',
      'Etanol': 'bg-green-100 text-green-800',
      'Diesel': 'bg-yellow-100 text-yellow-800',
      'GNV': 'bg-blue-100 text-blue-800'
    };
    return colors[fuelType] || 'bg-gray-100 text-gray-800';
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
            onClick={goBack}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">Quilometragem Atual</h1>
            <p className="text-sm text-gray-500">{currentVehicle.name} • {currentVehicle.plate}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-xs text-gray-500 ml-1">3/3</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-40">
        {/* Posto selecionado */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-green-50">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-900">Posto Confirmado</span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{selectedStation.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedStation.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo do abastecimento */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Resumo do Abastecimento</h3>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">{totalLiters.toFixed(1)} L</div>
                <div className="text-sm text-gray-500">Total de litros</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">R$ {totalValue.toFixed(2).replace('.', ',')}</div>
                <div className="text-sm text-gray-500">Valor total</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {fuelItems.map((item) => {
                const itemLiters = parseFloat(item.liters.replace(',', '.'));
                const percentage = ((itemLiters / totalLiters) * 100).toFixed(1);
                
                return (
                  <div key={item.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getFuelTypeColor(item.fuelType)}`}>
                          {item.fuelType}
                        </span>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {percentage}%
                        </span>
                      </div>
                      <span className="font-semibold text-sm">{item.liters} L</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 pl-1">
                      <span>R$ {item.pricePerLiter.replace('.', ',')}/L</span>
                      <span>R$ {item.totalPrice.replace('.', ',')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Informações do odômetro */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-blue-50">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Quilometragem do Odômetro</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-500 mb-2">Última quilometragem registrada</div>
              <div className="text-2xl font-bold text-gray-900">
                {currentVehicle.lastKm.toLocaleString('pt-BR')} km
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Em {new Date(currentVehicle.lastFuel.date).toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Quilometragem atual
              </label>
              <input
                type="text"
                value={km}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="90.000"
                className="w-full text-3xl font-bold text-center py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
              <p className="text-center text-gray-500 text-sm mt-2">quilômetros</p>
            </div>
            
            {km && (
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="text-center">
                  <div className="text-sm text-blue-600 mb-1">Distância percorrida:</div>
                  <div className="text-xl font-bold text-blue-900 mb-2">
                    {(parseInt(km.replace(/[^\d]/g, '')) - currentVehicle.lastKm).toLocaleString('pt-BR')} km
                  </div>
                  
                  {getEstimatedConsumption() && (
                    <>
                      <div className="text-sm text-blue-600 mb-1">Consumo estimado do período anterior:</div>
                      <div className="text-lg font-semibold text-blue-900">
                        {getEstimatedConsumption()} km/L
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        Baseado no último abastecimento
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Opções de captura automática */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Captura Automática</h3>
            <p className="text-xs text-gray-500">Detecte a quilometragem do odômetro automaticamente</p>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => simulateKmCapture()}
                disabled={isProcessing}
                className="group relative bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">Câmera</div>
                    <div className="text-xs text-gray-500">Foto do painel</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => simulateKmCapture()}
                disabled={isProcessing}
                className="group relative bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">Voz</div>
                    <div className="text-xs text-gray-500">Ditar KM</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="group relative bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">Galeria</div>
                    <div className="text-xs text-gray-500">Enviar foto</div>
                  </div>
                </div>
              </button>
            </div>
            
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-white">i</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Dica de captura</div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Para melhor precisão, fotografe o odômetro com boa iluminação e certifique-se de que todos os números estejam visíveis e nítidos.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informação sobre pular */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-yellow-900 mb-1">Quilometragem opcional</div>
              <div className="text-xs text-yellow-700 leading-relaxed">
                Você pode pular esta etapa, mas registrar a quilometragem ajuda a calcular o consumo do veículo e acompanhar sua eficiência.
              </div>
            </div>
          </div>
        </div>

        {/* Mensagens de erro */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        )}

        {/* Loading */}
        {isProcessing && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
              <span className="text-gray-600">Processando...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Botões fixos no rodapé */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="space-y-3">
          {km ? (
            // Se tem KM informado, mostra apenas o botão de finalizar (primário)
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`w-full py-4 rounded-2xl font-semibold transition-all duration-200 ${
                !isProcessing
                  ? 'bg-blue-600 text-white active:scale-95 hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isProcessing 
                ? 'Salvando...' 
                : `Finalizar com KM ${km}`
              }
            </button>
          ) : (
            // Se não tem KM informado, mostra apenas botão de continuar sem KM (secundário)
            <button
              onClick={skipKm}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Salvando...' : 'Continuar sem Quilometragem'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KilometerageInputScreen;
