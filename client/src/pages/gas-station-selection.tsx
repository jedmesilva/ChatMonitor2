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

const GasStationSelection = () => {
  const [, setLocation] = useLocation();
  const [selectedStation, setSelectedStation] = useState<any>(null);
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
    
    return allStations.filter((station: any) => 
      station.name.toLowerCase().includes(stationSearch.toLowerCase()) ||
      station.brand.toLowerCase().includes(stationSearch.toLowerCase()) ||
      station.address.toLowerCase().includes(stationSearch.toLowerCase())
    );
  };

  const handleStationSelect = (station: any) => {
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
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-400">{selectedStation.distance}</span>
                    {selectedStation.lastVisit && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>Último: {new Date(selectedStation.lastVisit).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Preços disponíveis */}
                  {selectedStation.prices && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs font-medium text-gray-700 mb-2">Preços disponíveis:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {selectedStation.prices.gasolina_comum && (
                          <div>Comum: <span className="font-medium">R$ {selectedStation.prices.gasolina_comum}</span></div>
                        )}
                        {selectedStation.prices.gasolina_aditivada && (
                          <div>Aditivada: <span className="font-medium">R$ {selectedStation.prices.gasolina_aditivada}</span></div>
                        )}
                        {selectedStation.prices.etanol && (
                          <div>Etanol: <span className="font-medium">R$ {selectedStation.prices.etanol}</span></div>
                        )}
                        {selectedStation.prices.diesel && (
                          <div>Diesel: <span className="font-medium">R$ {selectedStation.prices.diesel}</span></div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedStation(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Busca de posto */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={stationSearch}
                onChange={(e) => setStationSearch(e.target.value)}
                onFocus={() => setShowStationSearch(true)}
                placeholder="Buscar posto por nome ou localização"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
              {stationSearch && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            {showStationSearch && (
              <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                {filteredStations().slice(0, 8).map((station) => (
                  <button
                    key={station.id}
                    onClick={() => handleStationSelect(station)}
                    className="w-full p-3 text-left border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{station.name}</span>
                          {station.isFavorite && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{station.address}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-gray-400">{station.distance}</span>
                            {station.lastVisit && (
                              <div className="flex items-center gap-1 text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>Último: {new Date(station.lastVisit).toLocaleDateString('pt-BR')}</span>
                              </div>
                            )}
                          </div>
                          {station.prices && station.prices.gasolina_comum && (
                            <div className="text-xs text-green-600 font-medium">
                              Comum: R$ {station.prices.gasolina_comum}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                
                {filteredStations().length === 0 && (
                  <div className="text-center py-6">
                    <div className="text-gray-500 mb-4">
                      <p className="text-sm font-medium">Nenhum posto encontrado</p>
                      <p className="text-xs mt-1">Não encontrou o posto que procura?</p>
                    </div>
                    <button
                      onClick={handleAddStation}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar Posto Manualmente
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Formulário para adicionar novo posto */}
        {showAddStation && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-blue-50">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">Adicionar Novo Posto</span>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Posto *
                </label>
                <input
                  type="text"
                  value={newStationForm.name}
                  onChange={(e) => setNewStationForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Shell da Esquina, Posto do João, etc."
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Pode ser o nome oficial ou um apelido que você usa
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço ou Referência
                </label>
                <input
                  type="text"
                  value={newStationForm.address}
                  onChange={(e) => setNewStationForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Ex: Av. Paulista, 1000 ou próximo ao shopping"
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Endereço completo ou uma referência que te ajude a lembrar
                </p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSaveNewStation}
                  className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Adicionar Posto
                </button>
                <button
                  onClick={cancelAddStation}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Postos salvos/recentes */}
        {!showStationSearch && !showAddStation && (
          <div className="space-y-4">
            {/* Postos favoritos */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <h3 className="font-semibold text-gray-900">Postos Favoritos</h3>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {savedStations.filter(station => station.isFavorite).map((station) => (
                  <button
                    key={station.id}
                    onClick={() => handleStationSelect(station)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{station.name}</span>
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{station.address}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-gray-400">{station.distance}</span>
                            <div className="flex items-center gap-1 text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>Último: {new Date(station.lastVisit).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                          {station.prices && station.prices.gasolina_comum && (
                            <div className="text-xs text-green-600 font-medium">
                              Comum: R$ {station.prices.gasolina_comum}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Postos recentes */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Postos Recentes</h3>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {savedStations.filter(station => !station.isFavorite).map((station) => (
                  <button
                    key={station.id}
                    onClick={() => handleStationSelect(station)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{station.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{station.address}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-gray-400">{station.distance}</span>
                            <div className="flex items-center gap-1 text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>Último: {new Date(station.lastVisit).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                          {station.prices && station.prices.gasolina_comum && (
                            <div className="text-xs text-green-600 font-medium">
                              Comum: R$ {station.prices.gasolina_comum}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Postos próximos */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Postos Próximos</h3>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {nearbyStations.map((station) => (
                  <button
                    key={station.id}
                    onClick={() => handleStationSelect(station)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{station.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{station.address}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-blue-600 font-medium">{station.distance}</span>
                          </div>
                          {station.prices && station.prices.gasolina_comum && (
                            <div className="text-xs text-green-600 font-medium">
                              Comum: R$ {station.prices.gasolina_comum}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botões fixos no rodapé */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-2xl font-semibold bg-blue-600 text-white active:scale-95 hover:bg-blue-700 transition-all duration-200"
          >
            {selectedStation 
              ? `Continuar com ${selectedStation.name}` 
              : 'Continuar sem Posto'
            }
          </button>
          
          {selectedStation && (
            <button
              onClick={handleSkip}
              className="w-full py-3 rounded-2xl font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              Continuar sem Posto
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GasStationSelection;