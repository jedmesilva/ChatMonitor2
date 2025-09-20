import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import VehicleLedger from "@/pages/vehicle-ledger";
import VehicleInsightsScreen from "@/pages/vehicle-insights";
import FuelHistoryScreen from "@/pages/fuel-history";
import GasStationSelectionScreen from "@/pages/gas-station-selection";
import FuelEntryScreen from "./pages/fuel-entry";
import KilometerageInputScreen from "./pages/kilometerage-input";

function Router() {
  return (
    <Switch>
      <Route path="/" component={VehicleLedger} />
      <Route path="/monitor" component={VehicleInsightsScreen} />
      <Route path="/abastecimentos/posto" component={GasStationSelectionScreen} />
      <Route path="/abastecimentos/combustivel" component={FuelEntryScreen} />
      <Route path="/abastecimentos/quilometragem" component={KilometerageInputScreen} />
      <Route path="/abastecimentos" component={FuelHistoryScreen} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;