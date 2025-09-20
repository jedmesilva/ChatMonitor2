import { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  ChevronDown, 
  ChevronUp, 
  BarChart3, 
  Calendar, 
  Fuel, 
  Wrench, 
  AlertTriangle, 
  CheckCircle,
  Car,
  Camera,
  Plus,
  ArrowUp,
  Activity,
  MapPin,
  TrendingUp,
  DollarSign,
  Clock,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { Vehicle, VehicleEvent } from '@shared/schema';
import VehicleEventCard from '@/components/vehicle-event-card';
import VehicleSelector from '@/components/vehicle-selector';
import MoreOptionsModal from '@/components/more-options-modal';

// Componentes de Análise de Combustível - DESIGN ATUALIZADO COM NOVA PALETA
const FuelAnalysisCard = ({ fuelData, isActive = false }) => {
  const analysisResults = {
    consumption: '12.7',
    efficiency: 'excelente',
    cost: '6.01',
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
};

const PriceComparisonCard = ({ currentPrice, isActive = false }) => {
  const nearbyStations = [
    { name: 'Shell Vila', price: 5.85, distance: 2.1, savings: -0.16 },
    { name: 'Petrobras Centro', price: 6.15, distance: 1.5, savings: 0.14 },
    { name: 'Ipiranga Norte', price: 5.92, distance: 3.2, savings: -0.09 }
  ];

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-5 mb-3 shadow-sm ${
      isActive ? 'ring-1 ring-gray-300' : ''
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`rounded-xl p-3 ${isActive ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <DollarSign className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">Preços Próximos</h3>
          <p className="text-xs text-gray-500">Postos na região</p>
        </div>
      </div>

      <div className="space-y-3">
        {nearbyStations.map((station, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-900">{station.name}</span>
                  <p className="text-xs text-gray-500">{station.distance}km</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">R$ {station.price.toFixed(2)}</span>
                <p className={`text-xs font-medium ${station.savings < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {station.savings < 0 ? '↓' : '↑'} {Math.abs(station.savings).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ConsumptionTrendsCard = ({ isActive = false }) => {
  const [expandedSection, setExpandedSection] = useState(false);

  const monthlyData = [
    { month: 'Jan', consumption: 12.5, efficiency: 'boa' },
    { month: 'Fev', consumption: 13.2, efficiency: 'excelente' },
    { month: 'Mar', consumption: 12.8, efficiency: 'boa' },
    { month: 'Abr', consumption: 13.1, efficiency: 'excelente' }
  ];

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-5 mb-3 shadow-sm ${
      isActive ? 'ring-1 ring-gray-300' : ''
    }`}>
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpandedSection(!expandedSection)}
      >
        <div className="flex items-center gap-3">
          <div className={`rounded-xl p-3 ${isActive ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <BarChart3 className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Tendências</h3>
            <p className="text-xs text-gray-500">Últimos meses</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          {expandedSection ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {expandedSection && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-700 font-medium">{data.month}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">{data.consumption} km/L</span>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  data.efficiency === 'excelente' 
                    ? 'bg-green-50 text-green-700 border border-green-100' 
                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}>
                  {data.efficiency}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const VehicleStatsCard = ({ isActive = false }) => {
  const stats = {
    totalKm: 45750,
    avgConsumption: 12.9,
    totalSpent: 1250.80,
    fuelUps: 24
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-5 mb-3 shadow-sm ${
      isActive ? 'ring-1 ring-gray-300' : ''
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`rounded-xl p-3 ${isActive ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Car className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">Estatísticas</h3>
          <p className="text-xs text-gray-500">Resumo do veículo</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1 font-medium">Total KM</p>
          <p className="text-base font-bold text-gray-900">{stats.totalKm.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1 font-medium">Consumo Médio</p>
          <p className="text-base font-bold text-gray-900">{stats.avgConsumption} km/L</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1 font-medium">Gasto Total</p>
          <p className="text-base font-bold text-gray-900">R$ {stats.totalSpent.toFixed(0)}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1 font-medium">Abastecimentos</p>
          <p className="text-base font-bold text-gray-900">{stats.fuelUps}</p>
        </div>
      </div>
    </div>
  );
};

const InsightsCard = ({ insights = [], isAlert = false }) => {
  return (
    <div className="space-y-3 mb-4">
      {insights.map((insight, index) => {
        const colorClasses = isAlert ? {
          bg: 'bg-amber-50',
          border: 'border-amber-100',
          icon: 'text-amber-600',
          text: 'text-amber-800'
        } : {
          bg: 'bg-gray-50',
          border: 'border-gray-100',
          icon: 'text-gray-600',
          text: 'text-gray-800'
        };

        return (
          <div key={index} className={`${colorClasses.bg} ${colorClasses.border} border rounded-xl p-4`}>
            <div className="flex items-center gap-3">
              <insight.icon className={`w-4 h-4 ${colorClasses.icon}`} />
              <span className={`text-sm font-medium ${colorClasses.text}`}>{insight.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Mock data baseado nas mensagens do chat original
const chatHistory = [
  {
    id: 1,
    type: 'user',
    content: 'Abasteci 42,5L no Shell Centro por R$ 255,30',
    timestamp: '14:30',
    date: '2025-09-20',
    category: 'abastecimento',
    data: { liters: 42.5, price: 255.30, station: 'Shell Centro', km: 45230, kmTraveled: 540 }
  },
  {
    id: 2,
    type: 'chatmonitor',
    content: 'Perfeito! Analisei seu abastecimento em detalhes. Seu consumo está excelente e você fez uma boa escolha de posto.',
    timestamp: '14:31',
    date: '2025-09-20',
    category: 'analise',
    showAnalysis: true,
    analysisData: { liters: 42.5, price: 255.30, station: 'Shell Centro', km: 45230, kmTraveled: 540 }
  },
  {
    id: 3,
    type: 'user',
    content: 'Foto do painel',
    timestamp: '09:15',
    date: '2025-09-20',
    category: 'foto',
    isImage: true
  },
  {
    id: 4,
    type: 'chatmonitor',
    content: 'Identifiquei os dados da sua foto! Quilometragem atual é 44.690 km, com boa autonomia restante.',
    timestamp: '09:16',
    date: '2025-09-20',
    category: 'analise',
    insights: [
      { icon: MapPin, text: '380 km desde último abastecimento' },
      { icon: Fuel, text: 'Autonomia: ~160 km restantes' },
      { icon: Clock, text: 'Próximo abastecimento: em 2 dias' }
    ]
  },
  {
    id: 5,
    type: 'chatmonitor',
    content: 'Alerta de preços na sua região! Encontrei oportunidades de economia.',
    timestamp: '19:20',
    date: '2025-09-19',
    category: 'alerta',
    isAlert: true,
    insights: [
      { icon: TrendingUp, text: 'Gasolina subiu R$ 0,15 centavos' },
      { icon: MapPin, text: 'Shell Vila: R$ 5,85 (mais barato)' },
      { icon: Clock, text: 'Melhor horário: terça de manhã' }
    ]
  },
  {
    id: 6,
    type: 'user',
    content: 'Como está meu consumo médio?',
    timestamp: '10:30',
    date: '2025-09-19',
    category: 'duvida'
  },
  {
    id: 7,
    type: 'chatmonitor',
    content: 'Seu consumo está muito bom! Veja os detalhes e tendências dos últimos meses:',
    timestamp: '10:31',
    date: '2025-09-19',
    category: 'analise',
    showTrends: true
  }
];

function getCategoryIcon(category) {
  switch (category) {
    case 'abastecimento':
      return <Fuel size={16} className="text-blue-600" />;
    case 'analise':
      return <Activity size={16} className="text-green-600" />;
    case 'foto':
      return <Camera size={16} className="text-purple-600" />;
    case 'alerta':
      return <AlertCircle size={16} className="text-amber-600" />;
    case 'duvida':
      return <MessageCircle size={16} className="text-gray-600" />;
    default:
      return <MessageCircle size={16} className="text-gray-600" />;
  }
}

function getCategoryBg(category, isUser) {
  if (isUser) return 'bg-gray-800 border-gray-700';

  switch (category) {
    case 'abastecimento':
      return 'bg-blue-50 border-blue-100';
    case 'analise':
      return 'bg-green-50 border-green-100';
    case 'foto':
      return 'bg-purple-50 border-purple-100';
    case 'alerta':
      return 'bg-amber-50 border-amber-100';
    case 'duvida':
      return 'bg-white border-gray-200';
    default:
      return 'bg-white border-gray-200';
  }
}

function ChatHistoryContent() {
  const formatDate = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hoje';
    if (diffDays === 2) return 'Ontem';
    if (diffDays <= 7) return `${diffDays - 1} dias atrás`;

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  // Group messages by date and sort by date (oldest first, newest last)
  const groupedHistory = {};
  chatHistory.forEach(message => {
    const dateKey = formatDate(message.date);
    if (!groupedHistory[dateKey]) {
      groupedHistory[dateKey] = [];
    }
    groupedHistory[dateKey].push(message);
  });

  // Sort groups by date (oldest to newest)
  const sortedGroupEntries = Object.entries(groupedHistory).sort(([dateA], [dateB]) => {
    // Convert display dates back to actual dates for sorting
    const getActualDate = (displayDate) => {
      if (displayDate === 'Hoje') return new Date();
      if (displayDate === 'Ontem') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
      }
      // For other dates, find the original date from chatHistory
      const message = chatHistory.find(m => formatDate(m.date) === displayDate);
      return message ? new Date(message.date) : new Date();
    };

    return getActualDate(dateA) - getActualDate(dateB);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 h-full">
      <div className="space-y-6">
        {sortedGroupEntries.map(([dateGroup, messages]) => (
          <div key={dateGroup}>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Calendar size={14} />
              {dateGroup}
            </h2>

            <div className="space-y-4">
              {messages.map(message => {
                const isUser = message.type === 'user';

                return (
                  <div key={message.id} className="mb-6">
                    <div className={`w-full rounded-2xl p-5 shadow-sm border ${
                      isUser 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-200 text-gray-900'
                    }`}>

                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {!isUser && (
                            <div className="w-7 h-7 bg-gray-800 rounded-xl flex items-center justify-center">
                              <span className="text-sm font-bold text-white">C</span>
                            </div>
                          )}
                          <span className={`text-xs font-medium ${
                            isUser ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {isUser ? 'Você' : 'Chatmonitor'}
                          </span>
                        </div>
                        <span className={`text-xs ${
                          isUser ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </span>
                      </div>

                      {/* Content */}
                      <div className={`${
                        (message.showAnalysis || message.showTrends || message.insights) ? 'mb-4' : 'mb-0'
                      }`}>
                        {message.isImage ? (
                          <div>
                            <p className={`mb-3 ${isUser ? 'text-white' : 'text-gray-900'}`}>
                              {message.content}
                            </p>
                            <div className={`mt-3 px-3 py-2 rounded-lg ${isUser ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              <div className="flex items-center gap-2">
                                <Camera size={14} className={isUser ? 'text-gray-300' : 'text-gray-600'} />
                                <span className={`text-xs ${isUser ? 'text-gray-300' : 'text-gray-600'}`}>
                                  Imagem do painel enviada
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className={isUser ? 'text-white' : 'text-gray-900'}>
                            {message.content}
                          </p>
                        )}
                      </div>

                      {/* Data Details */}
                      {message.data && (
                        <div className={`mt-3 p-3 rounded-lg ${isUser ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className={isUser ? 'text-gray-300' : 'text-gray-500'}>Volume:</span>
                              <span className={`font-medium ml-1 ${isUser ? 'text-white' : 'text-gray-900'}`}>
                                {message.data.liters}L
                              </span>
                            </div>
                            <div>
                              <span className={isUser ? 'text-gray-300' : 'text-gray-500'}>Total:</span>
                              <span className={`font-medium ml-1 ${isUser ? 'text-white' : 'text-gray-900'}`}>
                                R$ {message.data.price.toFixed(2)}
                              </span>
                            </div>
                            <div className="col-span-2">
                              <span className={isUser ? 'text-gray-300' : 'text-gray-500'}>Local:</span>
                              <span className={`font-medium ml-1 ${isUser ? 'text-white' : 'text-gray-900'}`}>
                                {message.data.station}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Análise Completa de Combustível */}
                      {message.showAnalysis && (
                        <div className="space-y-4">
                          <FuelAnalysisCard fuelData={message.analysisData} isActive={true} />
                          <PriceComparisonCard currentPrice={message.analysisData?.price / message.analysisData?.liters} isActive={false} />
                          <ConsumptionTrendsCard isActive={false} />
                          <VehicleStatsCard isActive={false} />
                        </div>
                      )}

                      {/* Tendências apenas */}
                      {message.showTrends && (
                        <div className="space-y-4">
                          <ConsumptionTrendsCard isActive={true} />
                          <VehicleStatsCard isActive={true} />
                        </div>
                      )}

                      {/* Insights */}
                      {message.insights && (
                        <InsightsCard insights={message.insights} isAlert={message.isAlert} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const EVENT_TYPES = {
  FUEL: 'fuel',
  MAINTENANCE: 'maintenance',
  REPAIR: 'repair',
  ACCIDENT: 'accident',
  INSPECTION: 'inspection',
  INSURANCE: 'insurance',
  MILESTONE: 'milestone'
};

export default function VehicleLedger() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleSelector, setShowVehicleSelector] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState(new Set(['1']));
  const [message, setMessage] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isChatmonitorExpanded, setIsChatmonitorExpanded] = useState(false);
  const [selectedItems] = useState(3);
  const [textareaHeight, setTextareaHeight] = useState(120); // Increased default to better match actual size
  const [chatmonitorHeaderHeight] = useState(55);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch vehicles
  const { data: vehicles = [], isLoading: vehiclesLoading } = useQuery<Vehicle[]>({
    queryKey: ['/api/vehicles'],
  });

  // Fetch events for selected vehicle
  const { data: vehicleEvents = [], isLoading: eventsLoading } = useQuery<VehicleEvent[]>({
    queryKey: ['/api/vehicles', selectedVehicle?.id, 'events'],
    enabled: !!selectedVehicle,
  });

  // Set initial selected vehicle
  useEffect(() => {
    if (vehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(vehicles[0]);
    }
  }, [vehicles, selectedVehicle]);

  const isMessageEmpty = !message.trim();

  // Calculate bottom padding dynamically
  const calculateBottomPadding = useCallback(() => {
    if (selectedItems > 0) {
      return textareaHeight + chatmonitorHeaderHeight + 16;
    }
    return textareaHeight + 16;
  }, [textareaHeight, chatmonitorHeaderHeight, selectedItems]);

  // Update container height
  const updateContainerHeight = useCallback(() => {
    if (containerRef.current) {
      const actualHeight = containerRef.current.offsetHeight;
      setTextareaHeight(actualHeight);
    }
  }, []);

  // Force immediate height calculation on mount and layout changes
  useEffect(() => {
    const calculateHeight = () => {
      updateContainerHeight();
      // Force another calculation after a brief delay to catch any layout changes
      setTimeout(updateContainerHeight, 50);
    };

    calculateHeight();

    // Event listener to close vehicle selector when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (showVehicleSelector) {
        const vehicleSelector = document.querySelector('[data-testid="vehicle-selector"]');
        const headerVehicleSection = document.querySelector('[data-testid="header-vehicle"]');

        if (vehicleSelector && headerVehicleSection) {
          const isClickInsideSelector = vehicleSelector.contains(event.target as Node);
          const isClickInsideHeader = headerVehicleSection.contains(event.target as Node);

          if (!isClickInsideSelector && !isClickInsideHeader) {
            setShowVehicleSelector(false);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // ResizeObserver to watch for container size changes
    let resizeObserver: ResizeObserver | undefined;
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateContainerHeight();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [message, isChatmonitorExpanded, updateContainerHeight, showVehicleSelector]);

  // Handler for toggle Chatmonitor section
  const toggleChatmonitorExpansion = useCallback(() => {
    setIsChatmonitorExpanded(prev => !prev);
  }, []);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleSelector(false);
  };

  const toggleEventExpansion = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Reset height to auto to get the correct scrollHeight
    e.target.style.height = 'auto';

    // Set height based on scrollHeight, with min and max limits
    const newHeight = Math.min(Math.max(e.target.scrollHeight, 24), 128); // min 24px, max 128px
    e.target.style.height = newHeight + 'px';
  };

  const handleSelectMoreOption = (option: any) => {
    switch(option.id) {
      case 'combustivel':
        setMessage('Registrar abastecimento: ');
        break;
      case 'manutencao':
        setMessage('Registrar manutenção: ');
        break;
      case 'km':
        setMessage('Atualizar quilometragem: ');
        break;
      default:
        setMessage(`${option.label}: `);
    }

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
      }
    }, 100);
  };

  const filteredEvents = filterType === 'all' 
    ? vehicleEvents 
    : vehicleEvents.filter(event => event.type === filterType);

  // Function to format date for grouping
  const formatDate = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hoje';
    if (diffDays === 2) return 'Ontem';
    if (diffDays <= 7) return `${diffDays - 1} dias atrás`;

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Group events by date
  const groupedEvents: { [key: string]: typeof filteredEvents } = {};
  filteredEvents.forEach(event => {
    const dateKey = formatDate(event.created_at || event.date || new Date().toISOString());
    if (!groupedEvents[dateKey]) {
      groupedEvents[dateKey] = [];
    }
    groupedEvents[dateKey].push(event);
  });

  // Sort groups by date (oldest to newest for timeline effect)
  const sortedGroupEntries = Object.entries(groupedEvents).sort(([dateA], [dateB]) => {
    const getActualDate = (displayDate: string) => {
      if (displayDate === 'Hoje') return new Date();
      if (displayDate === 'Ontem') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
      }
      // For other dates, find the original date from events
      const event = filteredEvents.find(e => formatDate(e.created_at || e.date || new Date().toISOString()) === displayDate);
      return event ? new Date(event.created_at || event.date || new Date()) : new Date();
    };

    return getActualDate(dateA).getTime() - getActualDate(dateB).getTime();
  });

  if (vehiclesLoading) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando veículos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedVehicle) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum veículo selecionado</h3>
            <p className="text-gray-500">Selecione um veículo para visualizar o histórico.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm relative z-10">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-xl transition-colors"
            onClick={() => setShowVehicleSelector(!showVehicleSelector)}
            data-testid="header-vehicle"
          >
            <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900" data-testid="text-vehicle-name">
                  {selectedVehicle.name}
                </h1>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                  showVehicleSelector ? 'rotate-180' : ''
                }`} />
              </div>
              <p className="text-sm text-gray-500" data-testid="text-vehicle-info">
                {selectedVehicle.odometer.toLocaleString()} km • Placa {selectedVehicle.plate}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-xl" data-testid="button-analytics">
            <BarChart3 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="flex space-x-1 overflow-x-auto px-4">
          {[
            { key: 'all', label: 'Todos', icon: Calendar },
            { key: EVENT_TYPES.FUEL, label: 'Combustível', icon: Fuel },
            { key: EVENT_TYPES.MAINTENANCE, label: 'Manutenção', icon: Wrench },
            { key: EVENT_TYPES.REPAIR, label: 'Reparos', icon: AlertTriangle },
            { key: EVENT_TYPES.INSPECTION, label: 'Inspeções', icon: CheckCircle }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilterType(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filterType === key
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              data-testid={`button-filter-${key}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Events Timeline */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ paddingBottom: `${calculateBottomPadding()}px` }}
        data-testid="events-timeline"
      >
        {eventsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Carregando eventos...</p>
            </div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-500">
                {filterType === 'all' 
                  ? 'Este veículo ainda não possui eventos registrados.'
                  : 'Nenhum evento deste tipo foi encontrado.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedGroupEntries.map(([dateGroup, events]) => (
              <div key={dateGroup} className="space-y-4">
                {/* Date Header */}
                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                      {dateGroup}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Events for this date */}
                <div className="space-y-4">
                  {events.map((event) => (
                    <VehicleEventCard
                      key={event.id}
                      event={event}
                      isExpanded={expandedEvents.has(event.id)}
                      onToggleExpand={() => toggleEventExpansion(event.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chatmonitor Section */}
      {selectedItems > 0 && (
        <div 
          className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
            isChatmonitorExpanded 
              ? 'top-0 bottom-0 bg-white' 
              : 'bottom-0 bg-gray-800 rounded-t-3xl'
          }`}
          style={isChatmonitorExpanded ? {} : { paddingBottom: `${textareaHeight}px` }}
        >
          {/* Header */}
          <div className={`bg-gray-800 text-white ${isChatmonitorExpanded ? 'rounded-none' : 'rounded-t-3xl'}`}>
            <div className="max-w-4xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Chatmonitor</span>
                </div>

                <button 
                  onClick={toggleChatmonitorExpansion}
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  data-testid="button-toggle-chatmonitor"
                >
                  {isChatmonitorExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {isChatmonitorExpanded && (
            <div 
              className="flex-1 overflow-y-auto bg-gray-50 min-h-0" 
              style={{ 
                height: `calc(100vh - ${textareaHeight}px - 55px)`,
                maxHeight: `calc(100vh - ${textareaHeight}px - 55px)`
              }}
            >
              <ChatHistoryContent />
            </div>
          )}
        </div>
      )}

      {/* Chat Input */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-3xl transition-all duration-300 z-50"
        ref={containerRef}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Textarea */}
          <div className="mb-4">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyPress}
              placeholder="Adicionar evento, fazer pergunta..."
              className="w-full focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-500 text-base border-none bg-transparent resize-none min-h-[1.5rem] max-h-32 overflow-y-auto"
              rows={1}
              style={{ height: '24px' }}
              data-testid="input-message"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {[
                { icon: Fuel, label: 'Abastecimento', testId: 'button-fuel' },
                { icon: Wrench, label: 'Manutenção', testId: 'button-maintenance' },
                { icon: Camera, label: 'Foto', testId: 'button-camera' },
              ].map(({ icon: Icon, label, testId }, index) => (
                <button
                  key={index}
                  className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 active:scale-95 transition-all duration-200"
                  data-testid={testId}
                >
                  <Icon size={16} />
                </button>
              ))}

              {/* More Options Button */}
              <button
                onClick={() => setShowMoreOptions(true)}
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 active:scale-95 transition-all duration-200"
                data-testid="button-more-options"
              >
                <Plus size={16} />
              </button>
            </div>

            <button 
              onClick={handleSendMessage}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
                isMessageEmpty 
                  ? 'bg-gray-100 text-gray-500 opacity-50 cursor-not-allowed' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
              disabled={isMessageEmpty}
              data-testid="button-send"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* More Options Modal */}
      <MoreOptionsModal 
        isOpen={showMoreOptions}
        onClose={() => setShowMoreOptions(false)}
        onSelectOption={handleSelectMoreOption}
      />

      {/* Vehicle Selector */}
      {showVehicleSelector && (
        <VehicleSelector 
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          onVehicleSelect={handleVehicleSelect}
          onClose={() => setShowVehicleSelector(false)}
        />
      )}
    </div>
  );
}