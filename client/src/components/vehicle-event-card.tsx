import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  ChevronUp, 
  ChevronDown,
  Fuel,
  Wrench,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Shield,
  Target,
  Clock
} from "lucide-react";
import { VehicleEvent } from "@shared/schema";
import FuelAnalysisCard from "./fuel-analysis-card";

interface VehicleEventCardProps {
  event: VehicleEvent;
  isExpanded: boolean;
  onToggleExpand: () => void;
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

export default function VehicleEventCard({ 
  event, 
  isExpanded, 
  onToggleExpand 
}: VehicleEventCardProps) {
  const getEventConfig = (type: string) => {
    const configs = {
      [EVENT_TYPES.FUEL]: {
        icon: Fuel,
        color: 'bg-blue-50 border-blue-100',
        iconBg: 'bg-blue-500',
        iconColor: 'text-white',
        title: 'Abastecimento'
      },
      [EVENT_TYPES.MAINTENANCE]: {
        icon: Wrench,
        color: 'bg-green-50 border-green-100',
        iconBg: 'bg-green-500',
        iconColor: 'text-white',
        title: 'Manutenção'
      },
      [EVENT_TYPES.REPAIR]: {
        icon: AlertTriangle,
        color: 'bg-orange-50 border-orange-100',
        iconBg: 'bg-orange-500',
        iconColor: 'text-white',
        title: 'Reparo'
      },
      [EVENT_TYPES.ACCIDENT]: {
        icon: AlertCircle,
        color: 'bg-red-50 border-red-100',
        iconBg: 'bg-red-500',
        iconColor: 'text-white',
        title: 'Acidente'
      },
      [EVENT_TYPES.INSPECTION]: {
        icon: CheckCircle,
        color: 'bg-purple-50 border-purple-100',
        iconBg: 'bg-purple-500',
        iconColor: 'text-white',
        title: 'Inspeção'
      },
      [EVENT_TYPES.INSURANCE]: {
        icon: Shield,
        color: 'bg-indigo-50 border-indigo-100',
        iconBg: 'bg-indigo-500',
        iconColor: 'text-white',
        title: 'Seguro'
      },
      [EVENT_TYPES.MILESTONE]: {
        icon: Target,
        color: 'bg-amber-50 border-amber-100',
        iconBg: 'bg-amber-500',
        iconColor: 'text-white',
        title: 'Marco'
      }
    };
    return configs[type] || configs[EVENT_TYPES.FUEL];
  };

  const config = getEventConfig(event.type);
  const IconComponent = config.icon;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const cost = typeof event.cost === 'string' ? parseFloat(event.cost) : event.cost;

  return (
    <div className={`border rounded-2xl p-4 mb-3 shadow-sm ${config.color}`}>
      {/* Header Section */}
      <div 
        className="flex items-start justify-between cursor-pointer"
        onClick={onToggleExpand}
        data-testid={`button-toggle-event-${event.id}`}
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Icon */}
          <div className={`rounded-lg p-2 ${config.iconBg} shadow-sm`}>
            <IconComponent className={`w-4 h-4 ${config.iconColor}`} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and Location */}
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-0.5" data-testid={`text-event-title-${event.id}`}>
                {event.title}
              </h3>
              <p className="text-xs text-gray-500" data-testid={`text-event-location-${event.id}`}>
                {event.location || config.title}
              </p>
            </div>
            
            {/* Date and Time */}
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span className="text-xs font-medium text-gray-600" data-testid={`text-event-date-${event.id}`}>
                {formatDate(event.date)}
              </span>
            </div>
            
            {/* Bottom Row - KM and Cost */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-700" data-testid={`text-event-odometer-${event.id}`}>
                  {event.odometer?.toLocaleString()} km
                </span>
              </div>
              
              {cost > 0 && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900" data-testid={`text-event-cost-${event.id}`}>
                    R$ {cost.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Expand Button */}
        <button className="p-1.5 hover:bg-white/60 rounded-lg transition-colors ml-2 flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-gray-200/60" data-testid={`content-expanded-${event.id}`}>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed" data-testid={`text-event-description-${event.id}`}>
            {event.description || ''}
          </p>
          
          {event.details && typeof event.details === 'object' && event.details !== null && (
            <div className="bg-white/60 rounded-lg p-3 mb-3">
              <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Detalhes</h4>
              <div className="space-y-2">
                {Object.entries(event.details as Record<string, any>).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-0.5">
                    <span className="text-xs text-gray-500 capitalize font-medium">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold text-gray-800">{String(value) as React.ReactNode}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {event.type === EVENT_TYPES.FUEL && (
            <div className="mt-4">
              <FuelAnalysisCard fuelData={event.details as any} isActive={true} />
            </div>
          )}
          
          {event.images && Array.isArray(event.images) && event.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {event.images.map((image, index) => (
                <img 
                  key={index} 
                  src={String(image)} 
                  alt={`Registro ${index + 1}`} 
                  className="rounded-xl border border-gray-200 shadow-sm" 
                />
              ))}
            </div>
          )}
          
          {event.nextAction && (
            <div className="mt-3 p-3 bg-white/60 rounded-lg border border-gray-200/60">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-semibold text-gray-700">Próxima ação</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{event.nextAction}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
