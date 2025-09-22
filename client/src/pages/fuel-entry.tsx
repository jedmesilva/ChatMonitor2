import React, { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, 
  Check, 
  Camera, 
  Mic, 
  Upload,
  AlertCircle,
  Plus,
  X,
  ChevronDown,
  Fuel,
  MapPin
} from 'lucide-react';

const FuelIcon = ({ size = 24, className = "" }) => (
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
);

const FuelInputScreen = () => {
  const [, setLocation] = useLocation();
  const [fuelItems, setFuelItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    liters: '',
    pricePerLiter: '',
    totalPrice: '',
    fuelType: ''
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFuelDropdown, setShowFuelDropdown] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

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

  // Posto selecionado na etapa anterior (exemplo)
  const selectedStation = {
    id: 1,
    name: 'Shell Select',
    brand: 'Shell',
    address: 'Av. Paulista, 1500 - Bela Vista',
    distance: '0.8 km',
    prices: {
      gasolina_comum: '5.49',
      gasolina_aditivada: '5.69',
      etanol: '3.89',
      diesel: '5.99'
    }
  };

  // Tipos de combustível
  const fuelTypes = [
    { id: 'gasolina_comum', name: 'Gasolina Comum', color: 'bg-red-100 text-red-800' },
    { id: 'gasolina_aditivada', name: 'Gasolina Aditivada', color: 'bg-red-100 text-red-800' },
    { id: 'etanol', name: 'Etanol', color: 'bg-green-100 text-green-800' },
    { id: 'diesel', name: 'Diesel', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'gnv', name: 'GNV', color: 'bg-blue-100 text-blue-800' }
  ];

  // Formatação
  const formatPrice = (value) => value.replace(/[^\d,]/g, '');

  // Função para verificar se pode adicionar item
  const canAddItem = () => {
    const hasType = !!currentItem.fuelType;
    const hasLiters = !!currentItem.liters;
    const hasPrice = !!currentItem.pricePerLiter;
    const hasTotal = !!currentItem.totalPrice;

    return hasType && (
      (hasLiters && hasPrice) ||
      (hasTotal && hasPrice) ||
      (hasTotal && hasLiters)
    );
  };

  // Mostrar valores calculados
  const getCalculatedValues = () => {
    const liters = parseFloat(currentItem.liters.replace(',', '.') || '0');
    const price = parseFloat(currentItem.pricePerLiter.replace(',', '.') || '0');
    const total = parseFloat(currentItem.totalPrice.replace(',', '.') || '0');

    if (currentItem.liters && currentItem.pricePerLiter && !currentItem.totalPrice) {
      const calculatedTotal = (liters * price).toFixed(2);
      return `Total: R$ ${calculatedTotal.replace('.', ',')}`;
    } else if (currentItem.totalPrice && currentItem.pricePerLiter && !currentItem.liters) {
      const calculatedLiters = (total / price).toFixed(2);
      return `Litros: ${calculatedLiters.replace('.', ',')} L`;
    } else if (currentItem.totalPrice && currentItem.liters && !currentItem.pricePerLiter) {
      const calculatedPrice = (total / liters).toFixed(3);
      return `Preço/L: R$ ${calculatedPrice.replace('.', ',')}`;
    }

    return null;
  };

  // Validações
  const validateCurrentItem = () => {
    if (!currentItem.fuelType) {
      setError('Selecione o tipo de combustível');
      return false;
    }

    if (!canAddItem()) {
      setError('Preencha pelo menos 2 campos (ex: litros + preço/L)');
      return false;
    }

    const liters = parseFloat(currentItem.liters.replace(',', '.') || '0');
    const price = parseFloat(currentItem.pricePerLiter.replace(',', '.') || '0');
    const total = parseFloat(currentItem.totalPrice.replace(',', '.') || '0');

    if (currentItem.liters && (liters <= 0 || liters > 100)) {
      setError('Litros deve ser entre 0,1 e 100');
      return false;
    }
    if (currentItem.pricePerLiter && price <= 0) {
      setError('Preço deve ser maior que zero');
      return false;
    }
    if (currentItem.totalPrice && total <= 0) {
      setError('Valor total deve ser maior que zero');
      return false;
    }

    setError('');
    return true;
  };

  const validateFuelStep = () => {
    if (fuelItems.length === 0) {
      setError('Adicione pelo menos um combustível');
      return false;
    }

    setError('');
    return true;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'liters' || field === 'pricePerLiter') {
      formattedValue = formatPrice(value);
    }
    setCurrentItem(prev => ({ ...prev, [field]: formattedValue }));

    setError('');
  };

  const handleFuelTypeSelect = (type) => {
    setCurrentItem(prev => ({ ...prev, fuelType: type.name }));
    setShowFuelDropdown(false);
  };

  const addFuelItem = () => {
    if (validateCurrentItem()) {
      const liters = parseFloat(currentItem.liters.replace(',', '.') || '0');
      const price = parseFloat(currentItem.pricePerLiter.replace(',', '.') || '0');
      const total = parseFloat(currentItem.totalPrice.replace(',', '.') || '0');

      // Calcular valores faltantes
      let finalLiters, finalPrice, finalTotal;

      if (currentItem.liters && currentItem.pricePerLiter) {
        finalLiters = currentItem.liters;
        finalPrice = currentItem.pricePerLiter;
        finalTotal = (liters * price).toFixed(2).replace('.', ',');
      } else if (currentItem.totalPrice && currentItem.pricePerLiter) {
        finalTotal = currentItem.totalPrice;
        finalPrice = currentItem.pricePerLiter;
        finalLiters = (total / price).toFixed(2).replace('.', ',');
      } else if (currentItem.totalPrice && currentItem.liters) {
        finalTotal = currentItem.totalPrice;
        finalLiters = currentItem.liters;
        finalPrice = (total / liters).toFixed(3).replace('.', ',');
      }

      const newItem = {
        id: editingIndex !== null ? fuelItems[editingIndex].id : Date.now(),
        fuelType: currentItem.fuelType,
        liters: finalLiters,
        pricePerLiter: finalPrice,
        totalPrice: finalTotal
      };

      if (editingIndex !== null) {
        const updatedItems = [...fuelItems];
        updatedItems[editingIndex] = newItem;
        setFuelItems(updatedItems);
        setEditingIndex(null);
      } else {
        setFuelItems(prev => [...prev, newItem]);
      }

      // Limpar formulário
      setCurrentItem({
        liters: '',
        pricePerLiter: '',
        totalPrice: '',
        fuelType: ''
      });
    }
  };

  const editFuelItem = (index) => {
    const item = fuelItems[index];
    setCurrentItem({
      liters: item.liters,
      pricePerLiter: item.pricePerLiter,
      totalPrice: item.totalPrice,
      fuelType: item.fuelType
    });
    setEditingIndex(index);
  };

  const removeFuelItem = (index) => {
    setFuelItems(prev => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setCurrentItem({
        liters: '',
        pricePerLiter: '',
        totalPrice: '',
        fuelType: ''
      });
      setEditingIndex(null);
    }
  };

  const handleContinue = () => {
    if (validateFuelStep()) {
      console.log('Continuar para próxima etapa com:', fuelItems);
      // Navegar para próxima etapa (quilometragem)
      setLocation('/abastecimentos/quilometragem');
    }
  };

  const goBack = () => {
    setLocation('/abastecimentos/posto');
  };

  const simulateFuelCapture = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Simular dados de combustível detectados
      const mockLiters = (Math.random() * 30 + 20).toFixed(1).replace('.', ',');
      const mockPrice = (Math.random() * 2 + 4).toFixed(2).replace('.', ',');
      setCurrentItem(prev => ({ 
        ...prev, 
        liters: mockLiters,
        pricePerLiter: mockPrice 
      }));
      setIsProcessing(false);
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      simulateFuelCapture();
    }
  };

  // Calcular totais
  const totalLiters = fuelItems.reduce((sum, item) => sum + parseFloat(item.liters.replace(',', '.')), 0);
  const totalValue = fuelItems.reduce((sum, item) => sum + parseFloat(item.totalPrice.replace(',', '.')), 0);

  const getFuelTypeColor = (fuelType) => {
    const type = fuelTypes.find(t => t.name === fuelType);
    return type ? type.color : 'bg-gray-100 text-gray-800';
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
            <h1 className="text-lg font-semibold text-gray-900">Registrar Abastecimento</h1>
            <p className="text-sm text-gray-500">{currentVehicle.name} • {currentVehicle.plate}</p>
          </div>
          <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-800"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-500 ml-1">2/3</span>
            </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* Posto selecionado */}
        {selectedStation ? (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-green-50">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-900">Posto Selecionado</span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{selectedStation.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedStation.address}</span>
                  </div>

                  {/* Preços do posto para referência */}
                  {selectedStation.prices && (
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs font-medium text-gray-700 mb-2">Preços de referência do posto:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {selectedStation.prices.gasolina_comum && (
                          <div>Comum: <span className="font-medium text-gray-800">R$ {selectedStation.prices.gasolina_comum}</span></div>
                        )}
                        {selectedStation.prices.gasolina_aditivada && (
                          <div>Aditivada: <span className="font-medium text-gray-800">R$ {selectedStation.prices.gasolina_aditivada}</span></div>
                        )}
                        {selectedStation.prices.etanol && (
                          <div>Etanol: <span className="font-medium text-gray-800">R$ {selectedStation.prices.etanol}</span></div>
                        )}
                        {selectedStation.prices.diesel && (
                          <div>Diesel: <span className="font-medium text-gray-800">R$ {selectedStation.prices.diesel}</span></div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setLocation('/abastecimentos/posto')}
                  className="text-gray-800 text-sm font-medium"
                >
                  Alterar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-yellow-50">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-900">Nenhum posto selecionado</span>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">
                Você pode registrar o abastecimento sem informar o posto, mas será mais difícil acompanhar onde você abastece.
              </p>
              <button
                onClick={() => setLocation('/abastecimentos/posto')}
                className="text-gray-800 text-sm font-medium"
              >
                Selecionar posto agora
              </button>
            </div>
          </div>
        )}

        {/* Lista de combustíveis adicionados */}
        {fuelItems.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Combustíveis Adicionados</h3>
            </div>

            <div className="divide-y divide-gray-100">
              {fuelItems.map((item, index) => {
                const itemLiters = parseFloat(item.liters.replace(',', '.'));
                const percentage = ((itemLiters / totalLiters) * 100).toFixed(1);

                return (
                  <div key={item.id} className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getFuelTypeColor(item.fuelType)}`}>
                          {item.fuelType}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">{item.liters} L</span>
                        <span className="text-xs font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-full">
                          {percentage}%
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>R$ {item.pricePerLiter}/L</span>
                        <span>Total: R$ {item.totalPrice}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => editFuelItem(index)}
                        className="text-gray-800 text-sm font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => removeFuelItem(index)}
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Totais */}
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Geral</span>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{totalLiters.toFixed(1)} L</div>
                    <div className="text-sm text-gray-700">R$ {totalValue.toFixed(2).replace('.', ',')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulário para adicionar combustível */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingIndex !== null ? 'Editando Combustível' : 'Adicionar Combustível'}
            </h3>
            {editingIndex !== null && (
              <button
                onClick={() => {
                  setEditingIndex(null);
                  setCurrentItem({
                    liters: '',
                    pricePerLiter: '',
                    totalPrice: '',
                    fuelType: ''
                  });
                }}
                className="text-gray-500 text-sm"
              >
                Cancelar
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Tipo de combustível */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de combustível</label>
              <button
                onClick={() => setShowFuelDropdown(!showFuelDropdown)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-gray-800 focus:outline-none flex items-center justify-between text-left"
              >
                <span className={currentItem.fuelType ? 'text-gray-900' : 'text-gray-500'}>
                  {currentItem.fuelType || 'Selecione o combustível'}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>

              {showFuelDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {fuelTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleFuelTypeSelect(type)}
                      className="w-full p-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                    >
                      <span className="font-medium text-gray-900">{type.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Campos numéricos */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Litros</label>
                <input
                  type="text"
                  value={currentItem.liters}
                  onChange={(e) => handleInputChange('liters', e.target.value)}
                  placeholder="45,0"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço/L</label>
                <input
                  type="text"
                  value={currentItem.pricePerLiter}
                  onChange={(e) => handleInputChange('pricePerLiter', e.target.value)}
                  placeholder="5,49"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-gray-800 focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Valor total</label>
                <input
                  type="text"
                  value={currentItem.totalPrice}
                  onChange={(e) => handleInputChange('totalPrice', e.target.value)}
                  placeholder="255,30"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-gray-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Valores calculados */}
            {getCalculatedValues() && (
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Valor calculado:</div>
                <div className="text-sm font-medium text-gray-900">
                  {getCalculatedValues()}
                </div>
              </div>
            )}

            {/* Botão adicionar */}
            <button
              onClick={addFuelItem}
              disabled={!canAddItem()}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                canAddItem()
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              {editingIndex !== null ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>

        {/* Opções de captura automática para combustível */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Captura Automática</h3>
            <p className="text-xs text-gray-500">Detecte valores do combustível automaticamente</p>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => simulateFuelCapture()}
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
                onClick={() => simulateFuelCapture()}
                disabled={isProcessing}
                className="group relative bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">Voz</div>
                    <div className="text-xs text-gray-500">Falar valores</div>
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
              <div className="animate-spin w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full" />
              <span className="text-gray-600">Detectando valores...</span>
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

      {/* Botão fixo no rodapé */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button
          onClick={handleContinue}
          disabled={fuelItems.length === 0 || isProcessing}
          className={`w-full py-4 rounded-2xl font-semibold transition-all duration-200 ${
            fuelItems.length > 0 && !isProcessing
              ? 'bg-gray-800 text-white active:scale-95 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing 
            ? 'Processando...' 
            : `Continuar (${fuelItems.length} item${fuelItems.length > 1 ? 's' : ''})`
          }
        </button>
      </div>
    </div>
  );
};

export default FuelInputScreen;