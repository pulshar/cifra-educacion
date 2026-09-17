import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  PlusCircle,
  Filter,
  Calendar,
  Search,
  Check,
} from 'lucide-react';
import { AttendanceRecord, AttendanceType } from '../types';
import { EmptyState } from '../components/EmptyState';

export const AsistenciaView: React.FC = () => {
  const { studentAttendance, currentStudent, openModal, showToast } = useApp();

  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [monthFilter, setMonthFilter] = useState<string>('todos');

  // Summary Metrics
  const metrics = useMemo(() => {
    const totalAbsences = studentAttendance.filter((a) => a.type.startsWith('ausencia')).length;
    const justified = studentAttendance.filter((a) => a.type === 'ausencia_justificada').length;
    const unjustified = studentAttendance.filter((a) => a.type === 'ausencia_sin_justificar').length;
    const late = studentAttendance.filter((a) => a.type === 'retraso').length;
    return { totalAbsences, justified, unjustified, late };
  }, [studentAttendance]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return studentAttendance.filter((rec) => {
      const matchType = typeFilter === 'todos' || rec.type === typeFilter;
      const matchMonth =
        monthFilter === 'todos' || rec.date.startsWith(`2026-${monthFilter}`);
      return matchType && matchMonth;
    });
  }, [studentAttendance, typeFilter, monthFilter]);

  const renderTypeLabel = (type: AttendanceType) => {
    switch (type) {
      case 'ausencia_justificada':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            Ausencia justificada
          </span>
        );
      case 'ausencia_sin_justificar':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
            Sin justificar
          </span>
        );
      case 'retraso':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            Retraso
          </span>
        );
    }
  };

  return (
    <div id="asistencia-section-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Control de Asistencia y Puntualidad
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Registro oficial de faltas de asistencia y retrasos de <strong>{currentStudent.name}</strong>
          </p>
        </div>

        {/* Action: Notificar ausencia prevista */}
        <button
          id="btn-notify-planned-absence"
          onClick={() =>
            openModal('justify_absence', {
              id: 'planned',
              studentId: currentStudent.id,
              date: new Date().toISOString().split('T')[0],
              session: 'Día completo',
              subject: 'Todas las asignaturas',
              type: 'ausencia_sin_justificar',
              justified: false,
            })
          }
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Notificar Ausencia Prevista</span>
        </button>
      </div>

      {/* 7.1 INDICADORES DE ASISTENCIA */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Ausencias */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Ausencias</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            {metrics.totalAbsences}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Registradas este curso</div>
        </div>

        {/* Justificadas */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Justificadas</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            {metrics.justified}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
            Aceptadas por el centro
          </div>
        </div>

        {/* Sin Justificar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Sin Justificar</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            {metrics.unjustified}
          </div>
          <div className="text-[10px] text-rose-600 dark:text-rose-400 mt-1">
            Requieren justificación
          </div>
        </div>

        {/* Retrasos */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Retrasos</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-2">
            {metrics.late}
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
            Puntualidad en aula
          </div>
        </div>
      </div>

      {/* 7.2 LISTADO DETALLADO CON FILTROS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          {[
            { id: 'todos', label: 'Todas' },
            { id: 'ausencia_sin_justificar', label: 'Sin justificar' },
            { id: 'ausencia_justificada', label: 'Justificadas' },
            { id: 'retraso', label: 'Retrasos' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${typeFilter === f.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200"
        >
          <option value="todos">Todos los meses</option>
          <option value="09">Septiembre 2026</option>
          <option value="10">Octubre 2026</option>
        </select>
      </div>

      {/* List / Table */}
      {filteredRecords.length === 0 ? (
        <EmptyState title="No constan incidencias de asistencia con estos filtros" />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Fecha</th>
                  <th className="px-4 py-3.5">Hora / Sesión</th>
                  <th className="px-4 py-3.5">Asignatura</th>
                  <th className="px-4 py-3.5">Tipo de Falta</th>
                  <th className="px-4 py-3.5">Motivo / Estado</th>
                  <th className="px-5 py-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredRecords.map((rec) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {rec.date}
                    </td>
                    <td className="px-4 py-4">{rec.session}</td>
                    <td className="px-4 py-4 font-bold text-slate-800 dark:text-slate-200">
                      {rec.subject}
                    </td>
                    <td className="px-4 py-4">{renderTypeLabel(rec.type)}</td>
                    <td className="px-4 py-4 text-slate-500 max-w-xs truncate">
                      {rec.reason || (rec.justified ? 'Aceptado por tutoría' : 'Pendiente de justificar')}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {!rec.justified && rec.type === 'ausencia_sin_justificar' ? (
                        <button
                          id={`btn-justify-${rec.id}`}
                          onClick={() => openModal('justify_absence', rec)}
                          className="px-3 py-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 rounded-xl transition-colors cursor-pointer"
                        >
                          Justificar ahora
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-end gap-1">
                          <Check className="w-3.5 h-3.5" /> Justificada
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
