import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TagProvider } from "./contexts/TagContext";
import Dashboard from "./pages/Dashboard";
import TagsPage from "./pages/TagsPage";
import ReportPage from "./pages/ReportPage";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/tags" component={TagsPage} />
      <Route path="/report" component={ReportPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TagProvider>
          <TooltipProvider>
            <Toaster />
            <WouterRouter hook={useHashLocation}>
              <AppRoutes />
            </WouterRouter>
          </TooltipProvider>
        </TagProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
