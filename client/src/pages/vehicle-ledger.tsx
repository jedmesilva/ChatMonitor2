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
  Activity
} from 'lucide-react';
import { Vehicle, VehicleEvent } from '@shared/schema';
import VehicleEventCard from '@/components/vehicle-event-card';
import VehicleSelector from '@/components/vehicle-selector';
import MoreOptionsModal from '@/components/more-options-modal';

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
  const [textareaHeight, setTextareaHeight] = useState(78);
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

  useEffect(() => {
    updateContainerHeight();

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
          filteredEvents.map((event) => (
            <VehicleEventCard
              key={event.id}
              event={event}
              isExpanded={expandedEvents.has(event.id)}
              onToggleExpand={() => toggleEventExpansion(event.id)}
            />
          ))
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chatmonitor Section */}
      {selectedItems > 0 && (
        <div 
          className={`fixed left-0 right-0 z-[60] transition-all duration-300 ${
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
              className="flex-1 overflow-y-auto bg-white min-h-0" 
              style={{ 
                height: `calc(100vh - ${textareaHeight}px - 55px)`,
                maxHeight: `calc(100vh - ${textareaHeight}px - 55px)`
              }}
            >
              <div className="max-w-4xl mx-auto h-full">
                <div className="px-4 pt-6 h-full">
                  <div className="flex items-center justify-center min-h-[300px] h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Chatmonitor</h3>
                      <p className="text-gray-500">Em breve, funcionalidades de chat serão implementadas aqui.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Input */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-3xl transition-all duration-300 z-[100] shadow-lg"
        ref={containerRef}
        style={{ minHeight: '80px' }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Textarea */}
          <div className="mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Adicionar evento, fazer pergunta..."
              className="w-full focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-500 text-base border-none bg-transparent resize-none min-h-[1.5rem] max-h-32 overflow-y-auto"
              rows={1}
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
