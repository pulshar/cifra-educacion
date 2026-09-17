import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer } from './components/Toast';
import { ModalRenderer } from './components/Modal';

// Views
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { AgendaView } from './views/AgendaView';
import { ComunicacionesView } from './views/ComunicacionesView';
import { FacturacionView } from './views/FacturacionView';
import { CalificacionesView } from './views/CalificacionesView';
import { AsistenciaView } from './views/AsistenciaView';
import { DiariosView } from './views/DiariosView';
import { DocumentosView } from './views/DocumentosView';
import { ServiciosView } from './views/ServiciosView';
import { ConfiguracionView } from './views/ConfiguracionView';

const MainAppContent: React.FC = () => {
  const { activeSection, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 font-sans antialiased">
        <LoginView />
        <ModalRenderer />
        <ToastContainer />
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeSection) {
      case 'inicio':
        return <DashboardView />;
      case 'agenda':
        return <AgendaView />;
      case 'comunicaciones':
        return <ComunicacionesView />;
      case 'facturacion':
        return <FacturacionView />;
      case 'calificaciones':
        return <CalificacionesView />;
      case 'asistencia':
        return <AsistenciaView />;
      case 'diarios':
        return <DiariosView />;
      case 'documentos':
        return <DocumentosView />;
      case 'servicios':
        return <ServiciosView />;
      case 'configuracion':
        return <ConfiguracionView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans antialiased transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Sidebar (Fixed on Desktop, Drawer on Mobile) */}
      <Sidebar />

      {/* Content wrapper shifted on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Header with Student Selector */}
        <Header />

        {/* Main Content Area */}
        <main
          id="main-content-viewport"
          className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto"
        >
          {renderActiveView()}
        </main>
      </div>

      {/* Centralized Modal Manager */}
      <ModalRenderer />

      {/* Feedback Toast System */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
