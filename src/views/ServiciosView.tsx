import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Utensils,
  Bus,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  MapPin,
  Calendar,
  XCircle,
  HelpCircle,
  Info,
} from 'lucide-react';
import { ServiceType, EducationalService } from '../types';

export const ServiciosView: React.FC = () => {
  const { studentServices, currentStudent, openModal, showToast } = useApp();

  // Helper icons for service types
  const getServiceIcon = (type: ServiceType) => {
    switch (type) {
      case 'comedor':
        return Utensils;
      case 'transporte':
        return Bus;
      case 'extraescolar':
        return Sparkles;
      default:
        return Sparkles;
    }
  };

  return (
    <div id="servicios-section-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Servicios Complementarios y Actividades
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Gestión de comedor escolar, rutas de transporte y extraescolares de <strong>{currentStudent.name}</strong>
          </p>
        </div>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentServices.map((service) => {
          const Icon = getServiceIcon(service.type);

          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon, Name, Active State */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                        {service.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 capitalize">
                        {service.type}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${service.active
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                  >
                    {service.active ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Activo
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Inactivo
                      </>
                    )}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Specific details depending on service */}
                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
                  {service.schedule && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                      <span><strong>Horario:</strong> {service.schedule}</span>
                    </div>
                  )}

                  {service.details?.route && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Bus className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span><strong>Ruta:</strong> {service.details.route}</span>
                    </div>
                  )}

                  {service.details?.stop && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span><strong>Parada:</strong> {service.details.stop}</span>
                    </div>
                  )}

                  {service.details?.days && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span><strong>Días de uso:</strong> {service.details.days}</span>
                    </div>
                  )}

                  {service.details?.menu && (
                    <div className="flex items-center justify-between text-brand-600 dark:text-brand-400 font-semibold pt-1">
                      <span>Menú del mes disponible</span>
                      <button
                        onClick={() => showToast('Descargando Menú Escolar (PDF)...', 'success')}
                        className="text-[11px] underline hover:text-brand-700 cursor-pointer"
                      >
                        Ver menú
                      </button>
                    </div>
                  )}

                  {service.details?.allergens && (
                    <div className="flex items-start gap-1.5 text-amber-800 dark:text-amber-300 text-[11px] pt-1">
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                      <span><strong>Alergias/Dietas:</strong> {service.details.allergens}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons: Solicitar baja / Modificación con confirmación */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  id={`btn-manage-service-${service.id}`}
                  onClick={() => openModal('service_manage', service)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors cursor-pointer text-center"
                >
                  Solicitar Baja o Modificación
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
