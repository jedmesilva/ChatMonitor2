import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import VehicleLedger from "@/pages/vehicle-ledger";
import VehicleInsightsScreen from "@/pages/vehicle-insights";
import FuelHistoryScreen from "@/pages/fuel-history";
import GasStationSelection from "@/pages/gas-station-selection";

function Router() {
  return (
    <Switch>
      <Route path="/" component={VehicleLedger} />
      <Route path="/monitor" component={VehicleInsightsScreen} />
      <Route path="/abastecimentos" component={FuelHistoryScreen} />
      <Route path="/abastecimentos/posto" component={GasStationSelection} />
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
