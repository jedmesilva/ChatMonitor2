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
  // Map event types to semantic categories
  const TYPE_CATEGORY = {
    [EVENT_TYPES.FUEL]: 'info',
    [EVENT_TYPES.MAINTENANCE]: 'info', 
    [EVENT_TYPES.INSPECTION]: 'info',
    [EVENT_TYPES.INSURANCE]: 'info',
    [EVENT_TYPES.MILESTONE]: 'success',
    [EVENT_TYPES.REPAIR]: 'danger',
    [EVENT_TYPES.ACCIDENT]: 'danger'
  };

  const CATEGORY_STYLES = {
    info: {
      accent: 'border-l-blue-300',
      iconBg: 'bg-blue-100 dark:bg-blue-950',
      iconColor: 'text-blue-700 dark:text-blue-300'
    },
    success: {
      accent: 'border-l-emerald-300', 
      iconBg: 'bg-emerald-100 dark:bg-emerald-950',
      iconColor: 'text-emerald-700 dark:text-emerald-300'
    },
    danger: {
      accent: 'border-l-rose-300',
      iconBg: 'bg-rose-100 dark:bg-rose-950', 
      iconColor: 'text-rose-700 dark:text-rose-300'
    }
  };

  const getEventConfig = (type: string) => {
    const typeConfigs = {
      [EVENT_TYPES.FUEL]: { icon: Fuel, title: 'Abastecimento' },
      [EVENT_TYPES.MAINTENANCE]: { icon: Wrench, title: 'Manutenção' },
      [EVENT_TYPES.REPAIR]: { icon: AlertTriangle, title: 'Reparo' },
      [EVENT_TYPES.ACCIDENT]: { icon: AlertCircle, title: 'Acidente' },
      [EVENT_TYPES.INSPECTION]: { icon: CheckCircle, title: 'Inspeção' },
      [EVENT_TYPES.INSURANCE]: { icon: Shield, title: 'Seguro' },
      [EVENT_TYPES.MILESTONE]: { icon: Target, title: 'Marco' }
    };
    
    const baseConfig = typeConfigs[type] || typeConfigs[EVENT_TYPES.FUEL];
    const category = TYPE_CATEGORY[type as keyof typeof TYPE_CATEGORY] || 'info';
    const categoryStyles = CATEGORY_STYLES[category as keyof typeof CATEGORY_STYLES];
    
    return {
      ...baseConfig,
      category,
      ...categoryStyles
    };
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
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-3 shadow-sm border-l-4 ${config.accent}`}>
      {/* Header Section */}
      <div 
        className="flex items-start justify-between cursor-pointer"
        onClick={onToggleExpand}
        data-testid={`button-toggle-event-${event.id}`}
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Icon */}
          <div className={`rounded-lg p-2 ${config.iconBg}`}>
            <IconComponent className={`w-4 h-4 ${config.iconColor}`} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and Location */}
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-0.5" data-testid={`text-event-title-${event.id}`}>
                {event.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400" data-testid={`text-event-location-${event.id}`}>
                {event.location || config.title}
              </p>
            </div>
            
            {/* Date and Time */}
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400" data-testid={`text-event-date-${event.id}`}>
                {formatDate(event.date)}
              </span>
            </div>
            
            {/* Bottom Row - KM and Cost */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300" data-testid={`text-event-odometer-${event.id}`}>
                  {event.odometer?.toLocaleString()} km
                </span>
              </div>
              
              {cost > 0 && (
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100" data-testid={`text-event-cost-${event.id}`}>
                  R$ {cost.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Expand Button */}
        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors ml-2 flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>
      </div>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700" data-testid={`content-expanded-${event.id}`}>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed" data-testid={`text-event-description-${event.id}`}>
            {event.description || ''}
          </p>
          
          {event.details && typeof event.details === 'object' && event.details !== null && (
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 mb-3">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Detalhes</h4>
              <div className="space-y-2">
                {Object.entries(event.details as Record<string, any>).map(([key, value]) => {
                  const displayValue: string = value != null ? String(value) : '-';
                  return (
                    <div key={key} className="flex items-center justify-between py-0.5">
                      <span className="text-xs text-slate-500 capitalize font-medium">
                        {key.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-semibold text-slate-800">{displayValue}</span>
                    </div>
                  );
                })}
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
            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Próxima ação</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{event.nextAction}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
