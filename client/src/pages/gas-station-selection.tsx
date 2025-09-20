import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, 
  MapPin,
  Search,
  Clock,
  Star,
  Check,
  X,
  Plus
} from 'lucide-react';

// Tipos para as estações de combustível
interface Station {
  id: number;
  name: string;
  brand: string;
  address: string;
  distance?: string;
  isFavorite: boolean;
  lastVisit?: string;
  isUserAdded?: boolean;
  prices: Record<string, string>;
}

const GasStationSelection = () => {
  const [, setLocation] = useLocation();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [stationSearch, setStationSearch] = useState('');
  const [showStationSearch, setShowStationSearch] = useState(false);
  const [showAddStation, setShowAddStation] = useState(false);
  const [newStationForm, setNewStationForm] = useState({
    name: '',
    address: ''
  });

  // Dados do veículo atual
  const currentVehicle = {
    name: 'Honda Civic',
    year: '2020',
    plate: 'ABC-1234'
  };

  // Postos salvos/recentes
  const savedStations = [
    {
      id: 1,
      name: 'Shell Select',
      brand: 'Shell',
      address: 'Av. Paulista, 1500 - Bela Vista',
      distance: '0.8 km',
      isFavorite: true,
      lastVisit: '2024-09-15',
      prices: {
        gasolina_comum: '5.49',
        gasolina_aditivada: '5.69',
        etanol: '3.89',
        diesel: '5.99'
      }
    },
    {
      id: 2,
      name: 'Posto Ipiranga',
      brand: 'Ipiranga',
      address: 'R. Augusta, 2000 - Consolação',
      distance: '1.2 km',
      isFavorite: false,
      lastVisit: '2024-09-10',
      prices: {
        gasolina_comum: '5.45',
        gasolina_aditivada: '5.65',
        etanol: '3.85'
      }
    },
    {
      id: 3,
      name: 'BR Mania',
      brand: 'BR',
      address: 'Av. Rebouças, 800 - Pinheiros',
      distance: '2.1 km',
      isFavorite: true,
      lastVisit: '2024-09-08',
      prices: {
        gasolina_comum: '5.52',
        gasolina_aditivada: '5.72',
        etanol: '3.92',
        diesel: '6.05'
      }
    }
  ];

  // Postos próximos (simulado)
  const nearbyStations = [
    {
      id: 4,
      name: 'Posto Ale',
      brand: 'Ale',
      address: 'R. da Consolação, 1200',
      distance: '0.5 km',
      isFavorite: false,
      prices: {
        gasolina_comum: '5.47',
        etanol: '3.87'
      }
    },
    {
      id: 5,
      name: 'Texaco Express',
      brand: 'Texaco',
      address: 'Av. São Luís, 500',
      distance: '1.5 km',
      isFavorite: false,
      prices: {
        gasolina_comum: '5.51',
        gasolina_aditivada: '5.71',
        etanol: '3.91'
      }
    },
    {
      id: 6,
      name: 'Petrobras Distribuidora',
      brand: 'Petrobras',
      address: 'R. Oscar Freire, 1000',
      distance: '1.8 km',
      isFavorite: false,
      prices: {
        gasolina_comum: '5.46',
        gasolina_aditivada: '5.66',
        etanol: '3.84',
        diesel: '5.98'
      }
    }
  ];

  // Filtrar postos
  const filteredStations = () => {
    const allStations = [...savedStations, ...nearbyStations];
    if (!stationSearch.trim()) return allStations;
    
    return allStations.filter(station => 
      station.name.toLowerCase().includes(stationSearch.toLowerCase()) ||
      station.brand.toLowerCase().includes(stationSearch.toLowerCase()) ||
      station.address.toLowerCase().includes(stationSearch.toLowerCase())
    );
  };

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    setShowStationSearch(false);
    setShowAddStation(false);
    setStationSearch('');
  };

  const clearSearch = () => {
    setStationSearch('');
    setShowStationSearch(false);
    setShowAddStation(false);
  };

  const handleAddStation = () => {
    setShowAddStation(true);
    setShowStationSearch(false);
  };

  const handleSaveNewStation = () => {
    if (!newStationForm.name.trim()) {
      alert('Por favor, informe o nome do posto');
      return;
    }
    
    const newStation = {
      id: Date.now(), // ID temporário
      name: newStationForm.name.trim(),
      brand: 'Personalizado',
      address: newStationForm.address.trim() || 'Endereço não informado',
      distance: 'N/A',
      isFavorite: false,
      isUserAdded: true,
      prices: {}
    };
    
    setSelectedStation(newStation);
    setNewStationForm({ name: '', address: '' });
    setShowAddStation(false);
    setStationSearch('');
    alert(`Posto "${newStation.name}" adicionado com sucesso!`);
  };

  const cancelAddStation = () => {
    setShowAddStation(false);
    setNewStationForm({ name: '', address: '' });
  };

  const handleContinue = () => {
    if (selectedStation) {
      // Próxima etapa do fluxo - aqui seria ir para a tela de detalhes do abastecimento
      alert(`Continuando com ${selectedStation.name} - próxima etapa seria implementar a tela de detalhes do abastecimento`);
    } else {
      alert('Continuando sem posto selecionado - próxima etapa seria implementar a tela de detalhes do abastecimento');
    }
  };

  const handleSkip = () => {
    alert('Pulando seleção de posto - indo diretamente para detalhes do abastecimento');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
            onClick={() => setLocation('/abastecimentos')}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">Selecionar Posto</h1>
            <p className="text-sm text-gray-500">{currentVehicle.name} • {currentVehicle.plate}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <span className="text-xs text-gray-500 ml-1">1/3</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-40">
        {/* Posto selecionado */}
        {selectedStation && (
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
                    {selectedStation.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedStation.address}</span>
                  </div>
                  {selectedStation.distance && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{selectedStation.distance} de distância</span>
                    </div>
                  )}
                </div>
                
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setSelectedStation(null)}
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              {/* Preços disponíveis */}
              {selectedStation.prices && Object.keys(selectedStation.prices).length > 0 && (
                <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Preços Atuais</h4>
                  <div className="space-y-1">
                    {Object.entries(selectedStation.prices).map(([fuel, price]) => (
                      <div key={fuel} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {fuel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="text-sm font-bold text-gray-900">R$ {price}/L</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Busca */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={stationSearch}
                onChange={(e) => {
                  setStationSearch(e.target.value);
                  setShowStationSearch(true);
                }}
                onFocus={() => setShowStationSearch(true)}
                placeholder="Buscar posto ou adicionar novo..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            {stationSearch && (
              <button
                onClick={clearSearch}
                className="p-3 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Botão Adicionar Novo Posto */}
          <button
            onClick={handleAddStation}
            className="w-full p-3 border border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Adicionar novo posto</span>
            </div>
          </button>
        </div>

        {/* Formulário Adicionar Posto */}
        {showAddStation && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Novo Posto</h3>
              <button
                onClick={cancelAddStation}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Posto *
                </label>
                <input
                  type="text"
                  value={newStationForm.name}
                  onChange={(e) => setNewStationForm({ ...newStationForm, name: e.target.value })}
                  placeholder="Ex: Shell Paulista"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço (opcional)
                </label>
                <input
                  type="text"
                  value={newStationForm.address}
                  onChange={(e) => setNewStationForm({ ...newStationForm, address: e.target.value })}
                  placeholder="Ex: Av. Paulista, 1000"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <button
                onClick={handleSaveNewStation}
                className="w-full p-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Salvar Posto
              </button>
            </div>
          </div>
        )}

        {/* Lista de postos */}
        {(showStationSearch || stationSearch) && (
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900">
              {stationSearch ? 'Resultados da Busca' : 'Postos Disponíveis'}
            </h3>
            
            {filteredStations().map((station) => (
              <div key={station.id} className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{station.name}</h4>
                      {station.isFavorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{station.address}</span>
                    </div>
                    {station.distance && (
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{station.distance}</span>
                        {station.lastVisit && (
                          <>
                            <span>•</span>
                            <span>Última visita: {new Date(station.lastVisit).toLocaleDateString('pt-BR')}</span>
                          </>
                        )}
                      </div>
                    )}
                    
                    {/* Preços */}
                    {station.prices && Object.keys(station.prices).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(station.prices).slice(0, 3).map(([fuel, price]) => (
                          <span key={fuel} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
                            {fuel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}: R$ {price}/L
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleStationSelect(station)}
                    className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Selecionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Postos Salvos/Recentes (quando não há busca) */}
        {!showStationSearch && !stationSearch && (
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900">Postos Recentes</h3>
            
            {savedStations.map((station) => (
              <div key={station.id} className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{station.name}</h4>
                      {station.isFavorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{station.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{station.distance}</span>
                      <span>•</span>
                      <span>Última visita: {new Date(station.lastVisit).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    {/* Preços */}
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(station.prices).slice(0, 3).map(([fuel, price]) => (
                        <span key={fuel} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
                          {fuel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}: R$ {price}/L
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleStationSelect(station)}
                    className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Selecionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 p-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Pular
          </button>
          <button
            onClick={handleContinue}
            className="flex-2 p-4 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
          >
            {selectedStation ? 'Continuar' : 'Continuar sem posto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GasStationSelection;