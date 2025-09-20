import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, 
  MapPin,
  Fuel,
  Calculator,
  DollarSign
} from 'lucide-react';

const FuelEntry = () => {
  const [, setLocation] = useLocation();
  const [fuelData, setFuelData] = useState({
    fuelType: 'gasolina_comum',
    liters: '',
    pricePerLiter: '',
    totalCost: '',
    odometer: '',
    notes: ''
  });

  // Dados do veículo atual (vem do contexto/estado)
  const currentVehicle = {
    name: 'Honda Civic',
    year: '2020',
    plate: 'ABC-1234'
  };

  // Posto selecionado (normalmente viria da etapa anterior)
  const selectedStation = {
    name: 'Shell Select',
    address: 'Av. Paulista, 1500 - Bela Vista'
  };

  const fuelTypes = [
    { value: 'gasolina_comum', label: 'Gasolina Comum' },
    { value: 'gasolina_aditivada', label: 'Gasolina Aditivada' },
    { value: 'etanol', label: 'Etanol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'gnv', label: 'GNV' }
  ];

  const calculateTotalCost = () => {
    const liters = parseFloat(fuelData.liters);
    const pricePerLiter = parseFloat(fuelData.pricePerLiter);
    if (liters && pricePerLiter) {
      const total = (liters * pricePerLiter).toFixed(2);
      setFuelData(prev => ({ ...prev, totalCost: total }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFuelData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validação básica
    if (!fuelData.liters || !fuelData.pricePerLiter || !fuelData.odometer) {
      alert('Por favor, preencha os campos obrigatórios: Litros, Preço/Litro e Quilometragem');
      return;
    }

    alert(`Abastecimento salvo com sucesso!\n\nTipo: ${fuelTypes.find(t => t.value === fuelData.fuelType)?.label}\nLitros: ${fuelData.liters}L\nTotal: R$ ${fuelData.totalCost}\nQuilometragem: ${fuelData.odometer} km`);
    
    // Navegar de volta para o histórico
    setLocation('/abastecimentos');
  };

  const handleSkip = () => {
    setLocation('/abastecimentos');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
            onClick={() => setLocation('/abastecimentos/posto')}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">Registrar Abastecimento</h1>
            <p className="text-sm text-gray-500">{currentVehicle.name} • {currentVehicle.plate}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <span className="text-xs text-gray-500 ml-1">2/3</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-40">
        {/* Posto selecionado */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-green-50">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-900">Posto Selecionado</span>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-gray-900">{selectedStation.name}</h3>
            <p className="text-sm text-gray-500">{selectedStation.address}</p>
          </div>
        </div>

        {/* Formulário de abastecimento */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-blue-50">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Dados do Abastecimento</span>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Tipo de combustível */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Combustível *
              </label>
              <select
                value={fuelData.fuelType}
                onChange={(e) => handleInputChange('fuelType', e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                {fuelTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Litros */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade (Litros) *
              </label>
              <input
                type="number"
                step="0.01"
                value={fuelData.liters}
                onChange={(e) => handleInputChange('liters', e.target.value)}
                onBlur={calculateTotalCost}
                placeholder="Ex: 45.50"
                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Preço por litro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço por Litro (R$) *
              </label>
              <input
                type="number"
                step="0.001"
                value={fuelData.pricePerLiter}
                onChange={(e) => handleInputChange('pricePerLiter', e.target.value)}
                onBlur={calculateTotalCost}
                placeholder="Ex: 5.49"
                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Total calculado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total (R$)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={fuelData.totalCost}
                  onChange={(e) => handleInputChange('totalCost', e.target.value)}
                  placeholder="Será calculado automaticamente"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50"
                />
              </div>
              <button
                type="button"
                onClick={calculateTotalCost}
                className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Calculator className="w-3 h-3" />
                Calcular automaticamente
              </button>
            </div>

            {/* Quilometragem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quilometragem Atual (km) *
              </label>
              <input
                type="number"
                value={fuelData.odometer}
                onChange={(e) => handleInputChange('odometer', e.target.value)}
                placeholder="Ex: 45000"
                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Informe a quilometragem atual do veículo
              </p>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                rows={3}
                value={fuelData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Ex: Tanque cheio, promoção, etc."
                className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botões fixos no rodapé */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="space-y-3">
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-2xl font-semibold bg-blue-600 text-white active:scale-95 hover:bg-blue-700 transition-all duration-200"
          >
            Salvar Abastecimento
          </button>
          
          <button
            onClick={handleSkip}
            className="w-full py-3 rounded-2xl font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FuelEntry;