import { Plus, Camera, FileText } from "lucide-react";
import { OdometerIcon, FuelPumpIcon, FuelTankIcon } from "./custom-icons";
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  AlertCircle, 
  Target, 
  BarChart3, 
  Calendar, 
  Activity 
} from "lucide-react";

interface EventOption {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  description: string;
}

interface MoreOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: EventOption) => void;
}

export default function MoreOptionsModal({ 
  isOpen, 
  onClose, 
  onSelectOption 
}: MoreOptionsModalProps) {
  const eventOptions: EventOption[] = [
    { 
      id: 'km',
      icon: OdometerIcon, 
      label: 'Registrar KM', 
      description: 'Atualizar quilometragem atual'
    },
    { 
      id: 'combustivel',
      icon: FuelPumpIcon, 
      label: 'Abastecimento', 
      description: 'Registrar novo abastecimento'
    },
    { 
      id: 'tanque',
      icon: FuelTankIcon, 
      label: 'Nível do Tanque', 
      description: 'Atualizar combustível restante'
    },
    { 
      id: 'manutencao',
      icon: Wrench, 
      label: 'Manutenção', 
      description: 'Serviços preventivos e revisões'
    },
    { 
      id: 'reparo',
      icon: AlertTriangle, 
      label: 'Reparo', 
      description: 'Consertos e reparos necessários'
    },
    { 
      id: 'inspecao',
      icon: CheckCircle, 
      label: 'Inspeção', 
      description: 'Vistorias e revisões técnicas'
    },
    { 
      id: 'seguro',
      icon: Shield, 
      label: 'Seguro', 
      description: 'Renovação e sinistros'
    },
    { 
      id: 'acidente',
      icon: AlertCircle, 
      label: 'Acidente', 
      description: 'Registro de ocorrências'
    },
    { 
      id: 'marco',
      icon: Target, 
      label: 'Marco', 
      description: 'Quilometragem especial'
    },
    { 
      id: 'relatorio',
      icon: BarChart3, 
      label: 'Relatório', 
      description: 'Análise de custos e performance'
    },
    { 
      id: 'lembrete',
      icon: Calendar, 
      label: 'Lembrete', 
      description: 'Agendar manutenção futura'
    },
    { 
      id: 'consumo',
      icon: Activity, 
      label: 'Consumo', 
      description: 'Atualizar eficiência do veículo'
    }
  ];

  const handleSelectOption = (option: EventOption) => {
    onSelectOption(option);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white w-full max-h-[90vh] rounded-t-3xl shadow-xl animate-in slide-in-from-bottom-4 duration-300 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Adicionar Evento</h2>
            <p className="text-sm text-gray-500 mt-1">Selecione o tipo de registro</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            data-testid="button-close-modal"
          >
            <Plus className="w-5 h-5 text-gray-500 rotate-45" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 flex-1 overflow-y-auto">
          {eventOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option)}
              className="bg-white rounded-xl p-4 flex flex-col items-center text-center hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:shadow-sm group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 w-full flex-shrink-0"
              data-testid={`button-option-${option.id}`}
            >
              <div className="bg-gray-100 rounded-lg p-3 mb-3 transition-transform duration-200 group-hover:scale-105">
                <option.icon size={20} className="text-gray-600" />
              </div>
              <h3 className="text-gray-900 text-base font-medium mb-1">{option.label}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{option.description}</p>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-6 pt-0 flex-shrink-0">
          <div className="flex gap-2">
            <button 
              onClick={() => handleSelectOption({ id: 'photo_ai', icon: Camera, label: 'Foto + IA', description: '' })}
              className="flex-1 p-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
              data-testid="button-photo-ai"
            >
              <div className="flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" />
                Foto + IA
              </div>
            </button>
            <button 
              onClick={() => handleSelectOption({ id: 'import', icon: FileText, label: 'Importar', description: '' })}
              className="flex-1 p-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              data-testid="button-import"
            >
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Import
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
